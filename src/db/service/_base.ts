import {Model, SortOrder, Types} from 'mongoose';
import dbConnect from '@/lib/mongodb';

export type Plain<T> = Omit<T, never> & {_id: Types.ObjectId};

/** Loose filter — decoupled from Mongoose's internal QueryFilter type,
 *  which is module-augmentation-only and changes between majors. */
export type QueryFilter = Record<string, unknown>;

export interface ListOptions {
    filter?: QueryFilter;
    sort?: Record<string, SortOrder>;
    limit?: number;
}

/**
 * Generic CRUD service factory. Every method opens the cached Mongo
 * connection (src/lib/mongodb.ts) and reads use `.lean()` so results are
 * plain serializable objects safe to pass into Server Components.
 *
 * Adding a new domain = one `createCrudService(Model)` line + a Zod schema
 * + an admin folder. No new infra.
 */
export function createCrudService<T>(model: Model<T>) {
    return {
        async list(opts: ListOptions = {}): Promise<Plain<T>[]> {
            await dbConnect();
            let q = model.find((opts.filter ?? {}) as never);
            if (opts.sort) q = q.sort(opts.sort);
            if (opts.limit) q = q.limit(opts.limit);
            return q.lean<Plain<T>[]>().exec();
        },

        async getById(id: string): Promise<Plain<T> | null> {
            await dbConnect();
            if (!Types.ObjectId.isValid(id)) return null;
            return model.findById(id).lean<Plain<T>>().exec();
        },

        /** First (and only) document — for singleton collections. */
        async getSingleton(): Promise<Plain<T> | null> {
            await dbConnect();
            return model.findOne().lean<Plain<T>>().exec();
        },

        async create(data: Partial<T>): Promise<Plain<T>> {
            await dbConnect();
            const doc = await model.create(data);
            return doc.toObject() as Plain<T>;
        },

        async update(id: string, data: Partial<T>): Promise<Plain<T> | null> {
            await dbConnect();
            if (!Types.ObjectId.isValid(id)) return null;
            return model
                .findByIdAndUpdate(id, data, {new: true, runValidators: true})
                .lean<Plain<T>>()
                .exec();
        },

        /** Create-or-update the single document of a singleton collection. */
        async upsertSingleton(data: Partial<T>): Promise<Plain<T>> {
            await dbConnect();
            const existing = await model.findOne().select('_id').exec();
            if (existing) {
                return model
                    .findByIdAndUpdate(existing._id, data, {new: true, runValidators: true})
                    .lean<Plain<T>>()
                    .exec() as Promise<Plain<T>>;
            }
            const doc = await model.create(data);
            return doc.toObject() as Plain<T>;
        },

        async remove(id: string): Promise<boolean> {
            await dbConnect();
            if (!Types.ObjectId.isValid(id)) return false;
            const res = await model.findByIdAndDelete(id).exec();
            return !!res;
        },

        async reorder(pairs: {id: string; order: number}[]): Promise<void> {
            await dbConnect();
            const ops = pairs
                .filter((p) => Types.ObjectId.isValid(p.id))
                .map((p) => ({
                    updateOne: {
                        filter: {_id: new Types.ObjectId(p.id)},
                        update: {$set: {order: p.order}},
                    },
                }));
            if (ops.length) await model.bulkWrite(ops as never);
        },

        async count(filter: QueryFilter = {}): Promise<number> {
            await dbConnect();
            return model.countDocuments(filter as never).exec();
        },

        model,
    };
}

export type CrudService<T> = ReturnType<typeof createCrudService<T>>;
