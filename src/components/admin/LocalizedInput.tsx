'use client';
import {FC, useState} from 'react';

export type Localized = {en: string; ru?: string; uz?: string};
const LANGS: (keyof Localized)[] = ['en', 'ru', 'uz'];

interface Props {
    value: Localized;
    onChange: (v: Localized) => void;
    multiline?: boolean;
    label?: string;
}

const LocalizedInput: FC<Props> = ({value, onChange, multiline, label}) => {
    const [lang, setLang] = useState<keyof Localized>('en');
    const v: Localized = {
        en: value?.en ?? '',
        ru: value?.ru ?? '',
        uz: value?.uz ?? '',
    };

    return (
        <div className="rounded-lg border border-neutral-800">
            <div className="flex border-b border-neutral-800">
                {LANGS.map((l) => {
                    const empty = !v[l] || !v[l]!.trim();
                    return (
                        <button
                            key={l}
                            type="button"
                            onClick={() => setLang(l)}
                            className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
                                lang === l
                                    ? 'bg-neutral-800 text-white'
                                    : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                        >
                            {l}
                            {l !== 'en' && empty && (
                                <span className="ml-1 text-neutral-600">·empty</span>
                            )}
                            {l === 'en' && empty && <span className="ml-1 text-red-500">·req</span>}
                        </button>
                    );
                })}
                {label && (
                    <span className="ml-auto px-3 py-1.5 text-xs text-neutral-600">{label}</span>
                )}
            </div>
            {multiline ? (
                <textarea
                    rows={4}
                    value={v[lang] ?? ''}
                    onChange={(e) => onChange({...v, [lang]: e.target.value})}
                    placeholder={lang === 'en' ? 'Required' : 'Optional — falls back to EN'}
                    className="w-full resize-y bg-transparent px-3 py-2 text-sm outline-none"
                />
            ) : (
                <input
                    type="text"
                    value={v[lang] ?? ''}
                    onChange={(e) => onChange({...v, [lang]: e.target.value})}
                    placeholder={lang === 'en' ? 'Required' : 'Optional — falls back to EN'}
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none"
                />
            )}
        </div>
    );
};

export default LocalizedInput;
