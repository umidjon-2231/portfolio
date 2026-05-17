import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

export interface ISocialProofItem {
    platform: string;
    stat: LocalizedString;
    url?: string;
    order: number;
}

/** Singleton: a single document holding the ordered list of proof items. */
export interface ISocialProof {
    _id: Types.ObjectId;
    items: ISocialProofItem[];
    createdAt: Date;
    updatedAt: Date;
}

const SocialProofItemSchema = new Schema<ISocialProofItem>({
    platform: {type: String, required: true, trim: true},
    stat: {type: LocalizedStringSchema, required: true},
    url: {type: String, trim: true},
    order: {type: Number, default: 0},
}, {_id: false});

const SocialProofSchema = new Schema<ISocialProof>({
    items: {type: [SocialProofItemSchema], default: []},
}, {timestamps: true});

export default models.SocialProof || model<ISocialProof>('SocialProof', SocialProofSchema);
