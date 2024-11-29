import {model, models, Schema} from 'mongoose';
import {ObjectId} from "mongodb";

export interface IAbout {
    avatar: typeof ObjectId;
    bio: Record<string, string>
    createdAt: Date;
}

const AboutSchema = new Schema<IAbout>({
    avatar: {
        type: ObjectId,
        required: true,
        ref: "Attachment"
    },
    bio: {
        type: Map,
        of: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default models.About || model<IAbout>('About', AboutSchema);
