'use client';
import {FC, useRef, useState} from 'react';

interface Props {
    value?: string; // attachment ObjectId
    onChange: (id: string | undefined) => void;
    accept?: string;
}

const ImageField: FC<Props> = ({value, onChange, accept = 'image/*'}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const upload = async (file: File) => {
        setBusy(true);
        setError('');
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/admin/attachment', {method: 'POST', body: fd});
            const json = await res.json();
            if (res.ok && json.status) {
                onChange(json.data.id);
            } else {
                setError(json.message || 'Upload failed');
            }
        } catch {
            setError('Network error');
        } finally {
            setBusy(false);
        }
    };

    const isPdf = accept.includes('pdf');

    return (
        <div className="flex items-center gap-3">
            {value ? (
                isPdf ? (
                    <a
                        href={`/api/attachment/${value}`}
                        target="_blank"
                        className="text-sm text-neutral-300 underline"
                    >
                        View current file
                    </a>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={`/api/attachment/${value}`}
                        alt="preview"
                        className="h-16 w-16 rounded-md object-cover border border-neutral-800"
                    />
                )
            ) : (
                <div className="h-16 w-16 rounded-md border border-dashed border-neutral-800 grid place-items-center text-[10px] text-neutral-600">
                    none
                </div>
            )}
            <div className="space-y-1">
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) upload(f);
                    }}
                />
                <button
                    type="button"
                    disabled={busy}
                    onClick={() => inputRef.current?.click()}
                    className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900 disabled:opacity-50"
                >
                    {busy ? 'Uploading…' : value ? 'Replace' : 'Upload'}
                </button>
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange(undefined)}
                        className="ml-2 text-sm text-neutral-500 hover:text-red-400"
                    >
                        Remove
                    </button>
                )}
                {error && <p className="text-xs text-red-400">{error}</p>}
            </div>
        </div>
    );
};

export default ImageField;
