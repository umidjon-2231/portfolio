import { Schema, model, models, Document } from 'mongoose';

interface ISkill extends Document {
    name: string;
    logo: string;
    description: Record<string, string>;
    createdAt: Date;
}

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    description: {
        type: Map,
        of: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default models.Skill || model<ISkill>('Skill', SkillSchema);
