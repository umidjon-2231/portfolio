import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IWriting {
    _id: Types.ObjectId;
    title: LocalizedString;
    summary: LocalizedString;
    platform: string;
    url: string;
    metrics?: LocalizedString;
    date?: Date;
    featured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const WritingSchema = new Schema<IWriting>({
    title: {type: LocalizedStringSchema, required: true},
    summary: {type: LocalizedStringSchema, required: true},
    platform: {type: String, required: true, trim: true},
    url: {type: String, required: true, trim: true},
    metrics: {type: LocalizedStringSchema},
    date: {type: Date},
    featured: {type: Boolean, default: false},
    order: {type: Number, default: 0},
}, {timestamps: true});

WritingSchema.index({featured: -1, order: 1});

export default models.Writing || model<IWriting>('Writing', WritingSchema);
