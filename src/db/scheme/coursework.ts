import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface ICoursework {
    _id: Types.ObjectId;
    title: LocalizedString;
    description: LocalizedString;
    tools: string[];
    topics: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const CourseworkSchema = new Schema<ICoursework>({
    title: {type: LocalizedStringSchema, required: true},
    description: {type: LocalizedStringSchema, required: true},
    tools: {type: [String], default: []},
    topics: {type: [String], default: []},
    order: {type: Number, default: 0},
}, {timestamps: true});

CourseworkSchema.index({order: 1});

export default models.Coursework || model<ICoursework>('Coursework', CourseworkSchema);
