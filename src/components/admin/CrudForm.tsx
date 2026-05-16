'use client';
import {FC, useState} from 'react';
import type {FieldDef} from '@/lib/admin/fields';
import LocalizedInput, {type Localized} from './LocalizedInput';
import ImageField from './ImageField';

type Val = Record<string, unknown>;

const emptyLoc = (): Localized => ({en: '', ru: '', uz: ''});

const toDateInput = (v: unknown): string => {
    if (!v) return '';
    const d = new Date(v as string);
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

interface Props {
    fields: FieldDef[];
    initial?: Val;
    submitLabel?: string;
    onSubmit: (value: Val) => Promise<string | null>; // returns error message or null
    onCancel?: () => void;
}

const fieldShell = (label: string, help: string | undefined, node: React.ReactNode) => (
    <div className="space-y-1.5">
        <label className="block text-sm text-neutral-400">{label}</label>
        {node}
        {help && <p className="text-xs text-neutral-600">{help}</p>}
    </div>
);

const CrudForm: FC<Props> = ({fields, initial, submitLabel = 'Save', onSubmit, onCancel}) => {
    const [form, setForm] = useState<Val>(() => ({...(initial ?? {})}));
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [okMsg, setOkMsg] = useState('');

    const set = (name: string, value: unknown) =>
        setForm((f) => ({...f, [name]: value}));

    const renderInput = (def: FieldDef, value: unknown, onChange: (v: unknown) => void) => {
        switch (def.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={(value as string) ?? ''}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={value === undefined || value === null ? '' : (value as number)}
                        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        className="w-40 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                    />
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={toDateInput(value)}
                        onChange={(e) => onChange(e.target.value || undefined)}
                        className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                    />
                );
            case 'boolean':
                return (
                    <label className="inline-flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={!!value}
                            onChange={(e) => onChange(e.target.checked)}
                        />
                        <span className="text-neutral-400">enabled</span>
                    </label>
                );
            case 'tags':
                return (
                    <input
                        type="text"
                        value={Array.isArray(value) ? (value as string[]).join(', ') : ''}
                        onChange={(e) =>
                            onChange(
                                e.target.value
                                    .split(',')
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                            )
                        }
                        placeholder="comma, separated, values"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                    />
                );
            case 'localized':
            case 'localizedText':
                return (
                    <LocalizedInput
                        value={(value as Localized) ?? emptyLoc()}
                        onChange={onChange}
                        multiline={def.type === 'localizedText'}
                    />
                );
            case 'image':
                return (
                    <ImageField
                        value={value as string | undefined}
                        onChange={onChange}
                        accept={def.accept}
                    />
                );
            case 'localizedList': {
                const arr = (Array.isArray(value) ? value : []) as Localized[];
                return (
                    <div className="space-y-2">
                        {arr.map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="flex-1">
                                    <LocalizedInput
                                        value={item ?? emptyLoc()}
                                        onChange={(nv) => {
                                            const next = [...arr];
                                            next[i] = nv;
                                            onChange(next);
                                        }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onChange(arr.filter((_, j) => j !== i))}
                                    className="self-start rounded-md border border-neutral-800 px-2 py-1 text-xs text-neutral-500 hover:text-red-400"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => onChange([...arr, emptyLoc()])}
                            className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 hover:bg-neutral-900"
                        >
                            + Add
                        </button>
                    </div>
                );
            }
            case 'group': {
                const obj = (value as Val) ?? {};
                return (
                    <div className="rounded-lg border border-neutral-800 p-4 space-y-4">
                        {def.fields!.map((sub) =>
                            fieldShell(
                                sub.label,
                                sub.help,
                                renderInput(sub, obj[sub.name], (nv) =>
                                    onChange({...obj, [sub.name]: nv}),
                                ),
                            ),
                        )}
                    </div>
                );
            }
            case 'objectList': {
                const arr = (Array.isArray(value) ? value : []) as Val[];
                const blank = () =>
                    Object.fromEntries(
                        def.fields!.map((s) => [
                            s.name,
                            s.type === 'localized' || s.type === 'localizedText' ? emptyLoc() : '',
                        ]),
                    );
                return (
                    <div className="space-y-3">
                        {arr.map((row, i) => (
                            <div
                                key={i}
                                className="rounded-lg border border-neutral-800 p-4 space-y-4 relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => onChange(arr.filter((_, j) => j !== i))}
                                    className="absolute right-3 top-3 text-xs text-neutral-500 hover:text-red-400"
                                >
                                    ✕ remove
                                </button>
                                {def.fields!.map((sub) =>
                                    fieldShell(
                                        sub.label,
                                        sub.help,
                                        renderInput(sub, row[sub.name], (nv) => {
                                            const next = [...arr];
                                            next[i] = {...row, [sub.name]: nv};
                                            onChange(next);
                                        }),
                                    ),
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => onChange([...arr, blank()])}
                            className="rounded-md border border-neutral-800 px-3 py-1.5 text-xs text-neutral-400 hover:bg-neutral-900"
                        >
                            + Add item
                        </button>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    const submit = async () => {
        setBusy(true);
        setError('');
        setOkMsg('');
        try {
            const err = await onSubmit(form);
            if (err) setError(err);
            else setOkMsg('Saved');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="space-y-6">
            {fields.map((def) => (
                <div key={def.name}>
                    {fieldShell(
                        def.label,
                        def.help,
                        renderInput(def, form[def.name], (v) => set(def.name, v)),
                    )}
                </div>
            ))}
            {error && <p className="text-sm text-red-400">{error}</p>}
            {okMsg && <p className="text-sm text-emerald-400">{okMsg}</p>}
            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    disabled={busy}
                    onClick={submit}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
                >
                    {busy ? 'Saving…' : submitLabel}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default CrudForm;
