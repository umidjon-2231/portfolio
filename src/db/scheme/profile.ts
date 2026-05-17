import {model, models, Schema, Types} from 'mongoose';
import {LocalizedString, LocalizedStringSchema} from './_shared';

/** Singleton: the one profile document. */
export interface IProfile {
    _id: Types.ObjectId;
    fullName: string;
    headline: LocalizedString;
    shortBio: LocalizedString;
    longBio: LocalizedString;
    city: LocalizedString;
    age?: number;
    status: LocalizedString;
    avatar?: Types.ObjectId;
    cv?: Types.ObjectId;
    socialLinks: {
        github?: string;
        linkedin?: string;
        x?: string;
        telegram?: string;
        instagram?: string;
        email?: string;
    };
    careerGoals: LocalizedString[];
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
    fullName: {type: String, required: true, trim: true},
    headline: {type: LocalizedStringSchema, required: true},
    shortBio: {type: LocalizedStringSchema, required: true},
    longBio: {type: LocalizedStringSchema, required: true},
    city: {type: LocalizedStringSchema, required: true},
    age: {type: Number},
    status: {type: LocalizedStringSchema, required: true},
    avatar: {type: Schema.Types.ObjectId, ref: 'Attachment'},
    cv: {type: Schema.Types.ObjectId, ref: 'Attachment'},
    socialLinks: {
        github: String,
        linkedin: String,
        x: String,
        telegram: String,
        instagram: String,
        email: String,
    },
    careerGoals: {type: [LocalizedStringSchema], default: []},
}, {timestamps: true});

export default models.Profile || model<IProfile>('Profile', ProfileSchema);
