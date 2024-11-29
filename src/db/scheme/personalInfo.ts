import {model, models, Types, Schema} from 'mongoose';


export interface IPersonalInfo {
    avatar:  typeof Types.ObjectId;
    shortBio: Record<string, string>
    city: string,
    status: Record<string, string>
    socialLinks: {
        github?: string;
        linkedin?: string;
        x?: string;
        telegram?: string;
        instagram?: string;
        email?: string;
    };
    createdAt: Date;
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
    avatar: {
        type: Types.ObjectId,
        required: true,
        ref: 'Attachment'
    },
    city: {type: String, required: true},
    shortBio: {
        type: Map,
        of: String,
        required: true,
    },
    status: {
        type: Map,
        of: String,
        required: true,
    },
    socialLinks: {
        github: String,
        linkedin: String,
        x: String,
        telegram: String,
        instagram: String,
        email: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default models.PersonalInfo || model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);
