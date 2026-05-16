import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IExperience {
    _id: Types.ObjectId;
    role: LocalizedString;
    company: string;
    employmentType?: string;
    location?: string;
    remote: boolean;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: LocalizedString;
    highlights: LocalizedString[];
    techStack: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
    role: {type: LocalizedStringSchema, required: true},
    company: {type: String, required: true, trim: true},
    employmentType: {type: String, trim: true},
    location: {type: String, trim: true},
    remote: {type: Boolean, default: false},
    startDate: {type: Date, required: true},
    endDate: {type: Date},
    current: {type: Boolean, default: false},
    description: {type: LocalizedStringSchema, required: true},
    highlights: {type: [LocalizedStringSchema], default: []},
    techStack: {type: [String], default: []},
    order: {type: Number, default: 0},
}, {timestamps: true});

ExperienceSchema.index({order: 1, startDate: -1});

export default models.Experience || model<IExperience>('Experience', ExperienceSchema);
