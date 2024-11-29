import { Schema, model, Document } from 'mongoose';

interface IExperience extends Document {
    title: Record<string, string>;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: Record<string, string>;
    createdAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
    title: {
        type: Map,
        of: String,
        required: true,
    },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
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

export default mongoose.models.Experience || model<IExperience>('Experience', ExperienceSchema);
