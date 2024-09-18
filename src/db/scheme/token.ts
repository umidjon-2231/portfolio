import mongoose, { Schema, Document } from 'mongoose';

interface IToken extends Document {
    authKey: string;
    createdAt: Date;
    expireAt: Date;
    ip: string;
}

const TokenSchema: Schema = new Schema({
    authKey: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
    ip: String,
});

TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Token ||  mongoose.model<IToken>('Token', TokenSchema);
