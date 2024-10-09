import {model, models, Schema} from 'mongoose';

export interface IPersonalInfo {
    avatar: string;
    bio: {
        [key: string]: string;
    }
    city: string,
    status: {
        [key: string]: string;
    },
    socialLinks: {
        github?: string;
        linkedin?: string;
        x?: string;
        telegram?: string;
        instagram?: string;
        email?: string;
    };
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
    avatar: {type: String, required: true},
    city: {type: String, required: true},
    bio: {
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
});

export default models.PersonalInfo || model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);
