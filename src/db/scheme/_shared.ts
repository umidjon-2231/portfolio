import {Schema} from 'mongoose';

/**
 * Trilingual content primitive (EN required, RU/UZ optional with graceful
 * fallback to EN). Replaces the old `type: Map, of: String` fields, which
 * serialized to `{}` across the Server-Component boundary.
 */
export interface LocalizedString {
    en: string;
    ru?: string;
    uz?: string;
}

/** Reusable Mongoose sub-schema for a {en, ru, uz} field. `_id: false` so it
 *  is stored as a plain embedded object that serializes cleanly. */
export const LocalizedStringSchema = new Schema<LocalizedString>({
    en: {type: String, required: true, trim: true},
    ru: {type: String, trim: true, default: ''},
    uz: {type: String, trim: true, default: ''},
}, {_id: false});

/** Resolve a localized value for a locale with fallback to EN. */
export const localized = (
    value: LocalizedString | undefined | null,
    lang: string,
): string => {
    if (!value) return '';
    const key = lang as keyof LocalizedString;
    return (value[key] && String(value[key]).trim()) || value.en || '';
};

/** Common fields shared by every ordered collection document. */
export interface OrderedDoc {
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
