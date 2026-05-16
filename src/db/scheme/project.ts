import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface IProject {
    _id: Types.ObjectId;
    title: LocalizedString;
    description: LocalizedString;
    techStack: string[];
    links: {
        github?: string;
        liveDemo?: string;
        npm?: string;
        other?: string;
    };
    featured: boolean;
    coverImage?: Types.ObjectId;
    category?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: {type: LocalizedStringSchema, required: true},
    description: {type: LocalizedStringSchema, required: true},
    techStack: {type: [String], default: []},
    links: {
        github: String,
        liveDemo: String,
        npm: String,
        other: String,
    },
    featured: {type: Boolean, default: false},
    coverImage: {type: Schema.Types.ObjectId, ref: 'Attachment'},
    category: {type: String, trim: true},
    order: {type: Number, default: 0},
}, {timestamps: true});

ProjectSchema.index({featured: -1, order: 1});

export default models.Project || model<IProject>('Project', ProjectSchema);
