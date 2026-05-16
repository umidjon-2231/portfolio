import {model, models, Schema} from 'mongoose';

export interface IAttachment {
    name: string,
    contentType: string,
    size: number,
    category?: string,
    createdAt: Date
    content: Buffer
}

const AttachmentSchema = new Schema<IAttachment>({
    name: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    content: {
        type: Buffer,
        required: true,
    }
});

export default models.Attachment || model<IAttachment>('Attachment', AttachmentSchema);
