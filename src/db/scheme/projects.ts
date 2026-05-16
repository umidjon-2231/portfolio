import { Schema, model, models, Document } from 'mongoose';

interface IProject extends Document {
    title: Record<string, string>;
    description: Record<string, string>;
    techStack: string[];
    links: {
        github?: string;
        liveDemo?: string;
    };
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: {
        type: Map,
        of: String,
        required: true,
    },
    description: {
        type: Map,
        of: String,
        required: true,
    },
    techStack: [String],
    links: {
        github: String,
        liveDemo: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default models.Project || model<IProject>('Project', ProjectSchema);
