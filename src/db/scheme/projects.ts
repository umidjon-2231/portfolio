import { Schema, model, Document } from 'mongoose';

interface IProject extends Document {
    title: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    techStack: string[];
    links: {
        github?: string;
        liveDemo?: string;
    };
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
});

export default mongoose.models.Project ||  model<IProject>('Project', ProjectSchema);
