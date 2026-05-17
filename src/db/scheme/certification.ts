import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface ICertification {
    _id: Types.ObjectId;
    name: LocalizedString;
    issuer: string;
    date?: Date;
    url?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>({
    name: {type: LocalizedStringSchema, required: true},
    issuer: {type: String, required: true, trim: true},
    date: {type: Date},
    url: {type: String, trim: true},
    order: {type: Number, default: 0},
}, {timestamps: true});

CertificationSchema.index({order: 1});

export default models.Certification || model<ICertification>('Certification', CertificationSchema);
