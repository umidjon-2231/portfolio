import {model, models, Schema} from 'mongoose';

export interface IAbout {
    avatar: string;
    bio: {
        [key: string]: string;
    }
}

const AboutSchema = new Schema<IAbout>({
    avatar: {type: String, required: true},
    bio: {
        type: Map,
        of: String,
        required: true,
    },
});

export default models.About || model<IAbout>('About', AboutSchema);
