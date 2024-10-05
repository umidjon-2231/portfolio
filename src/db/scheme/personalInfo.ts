import {Document, model, models, Schema} from 'mongoose';

export interface IPersonalInfo extends Document {
    avatar: string;
    bio: {
        [key: string]: string;
    };
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        telegram?: string;
        instagram?: string;
        email?: string;
    };
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
    avatar: {type: String, required: true},
    bio: {
        type: Map,
        of: String,
        required: true,
    },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        telegram: String,
        instagram: String,
        email: String
    },
});

export default models.PersonalInfo || model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);
