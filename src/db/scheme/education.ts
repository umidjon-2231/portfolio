import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IEducation {
    _id: Types.ObjectId;
    institution: string;
    degree: LocalizedString;
    field?: LocalizedString;
    startDate?: Date;
    endDate?: Date;
    grade?: string;
    notes: LocalizedString[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>({
    institution: {type: String, required: true, trim: true},
    degree: {type: LocalizedStringSchema, required: true},
    field: {type: LocalizedStringSchema},
    startDate: {type: Date},
    endDate: {type: Date},
    grade: {type: String, trim: true},
    notes: {type: [LocalizedStringSchema], default: []},
    order: {type: Number, default: 0},
}, {timestamps: true});

EducationSchema.index({order: 1, startDate: -1});

export default models.Education || model<IEducation>('Education', EducationSchema);
