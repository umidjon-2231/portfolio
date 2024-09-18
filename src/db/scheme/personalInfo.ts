import {Document, model, models, Schema} from 'mongoose';

interface IPersonalInfo extends Document {
    name: {
        [key: string]: string;
    };
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
    };
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
    name: {
        type: Map,
        of: String,
        required: true,
    },
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
    },
});

export default models.PersonalInfo ||  model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);
