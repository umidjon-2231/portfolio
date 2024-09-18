import { Schema, model, Document } from 'mongoose';

interface ISkill extends Document {
    name: string;
    logo: string;
    description: {
        [key: string]: string;
    };
}

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    description: {
        type: Map,
        of: String,
        required: true,
    },
});

export default mongoose.models.Skill || model<ISkill>('Skill', SkillSchema);
