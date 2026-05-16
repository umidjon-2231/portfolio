import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IOpenSource {
    _id: Types.ObjectId;
    name: string;
    description: LocalizedString;
    url: string;
    repoUrl?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const OpenSourceSchema = new Schema<IOpenSource>({
    name: {type: String, required: true, trim: true},
    description: {type: LocalizedStringSchema, required: true},
    url: {type: String, required: true, trim: true},
    repoUrl: {type: String, trim: true},
    order: {type: Number, default: 0},
}, {timestamps: true});

OpenSourceSchema.index({order: 1});

export default models.OpenSource || model<IOpenSource>('OpenSource', OpenSourceSchema);
