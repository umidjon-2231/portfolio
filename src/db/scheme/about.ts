import {model, models, Schema, ObjectId} from 'mongoose';
export interface IAbout {
    avatar: ObjectId;
    bio: Record<string, string>
    createdAt: Date;
}

const AboutSchema = new Schema<IAbout>({
    avatar: {
        type: Schema.Types.ObjectId,
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
