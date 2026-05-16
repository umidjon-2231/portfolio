import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface ISkill {
    _id: Types.ObjectId;
    name: string;
    category: string;
    logo?: string;
    description?: LocalizedString;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
    name: {type: String, required: true, trim: true, unique: true},
    category: {type: String, required: true, trim: true},
    logo: {type: String, trim: true},
    description: {type: LocalizedStringSchema},
    order: {type: Number, default: 0},
}, {timestamps: true});

SkillSchema.index({category: 1, order: 1});

export default models.Skill || model<ISkill>('Skill', SkillSchema);
