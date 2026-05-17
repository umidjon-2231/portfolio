'use client';
import {useEffect, useState} from 'react';
import type {DomainKey} from '@/db/service';
import {FORM_FIELDS, ROW_TITLE} from '@/lib/admin/fields';
import CrudForm from './CrudForm';
import ReorderableList, {type Row} from './ReorderableList';

type Doc = Record<string, unknown> & {_id?: string};

interface Props {
    domainKey: DomainKey;
    singleton: boolean;
    label: string;
}

const api = (k: string, path = '') => `/api/admin/${k}${path}`;

export default function DomainEditor({domainKey, singleton, label}: Props) {
    const fields = FORM_FIELDS[domainKey];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [single, setSingle] = useState<Doc | null>(null);
    const [list, setList] = useState<Doc[]>([]);
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [editing, setEditing] = useState<Doc | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    // All state updates happen after `await`, never synchronously in the
    // effect body (satisfies react-hooks/set-state-in-effect).
    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await fetch(api(domainKey), {cache: 'no-store'});
                const json = await res.json();
                if (!active) return;
                if (!res.ok || !json.status) {
                    setError(json.message || 'Failed to load');
                } else if (singleton) {
                    setSingle(json.data ?? {});
                } else {
                    setList(Array.isArray(json.data) ? json.data : []);
                }
            } catch {
                if (active) setError('Network error');
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [domainKey, singleton, reloadKey]);

    const reload = () => {
        setLoading(true);
        setError('');
        setReloadKey((k) => k + 1);
    };

    const saveSingleton = async (value: Record<string, unknown>): Promise<string | null> => {
        const res = await fetch(api(domainKey), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(value),
        });
        const json = await res.json();
        if (!res.ok || !json.status) return json.message || 'Save failed';
        setSingle(json.data);
        return null;
    };

    const create = async (value: Record<string, unknown>): Promise<string | null> => {
        const res = await fetch(api(domainKey), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(value),
        });
        const json = await res.json();
        if (!res.ok || !json.status) return json.message || 'Create failed';
        reload();
        setMode('list');
        return null;
    };

    const update = async (value: Record<string, unknown>): Promise<string | null> => {
        if (!editing?._id) return 'Missing id';
        const res = await fetch(api(domainKey, `/${editing._id}`), {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(value),
        });
        const json = await res.json();
        if (!res.ok || !json.status) return json.message || 'Update failed';
        reload();
        setMode('list');
        setEditing(null);
        return null;
    };

    const remove = async (id: string) => {
        if (!confirm('Delete this entry?')) return;
        setBusyId(id);
        await fetch(api(domainKey, `/${id}`), {method: 'DELETE'});
        setBusyId(null);
        reload();
    };

    const move = async (id: string, dir: -1 | 1) => {
        const idx = list.findIndex((d) => d._id === id);
        const swap = idx + dir;
        if (idx < 0 || swap < 0 || swap >= list.length) return;
        const next = [...list];
        [next[idx], next[swap]] = [next[swap], next[idx]];
        setList(next);
        await fetch(api(domainKey, '/reorder'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: next.map((d, i) => ({id: d._id, order: i})),
            }),
        });
    };

    if (loading) return <p className="text-sm text-neutral-500">Loading…</p>;

    const header = (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">{label}</h1>
            {!singleton && mode === 'list' && (
                <button
                    onClick={() => {
                        setEditing(null);
                        setMode('create');
                    }}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
                >
                    + New entry
                </button>
            )}
        </div>
    );

    if (error && mode === 'list') {
        return (
            <div>
                {header}
                <p className="text-sm text-red-400">{error}</p>
            </div>
        );
    }

    if (singleton) {
        return (
            <div>
                {header}
                <CrudForm
                    fields={fields}
                    initial={single ?? {}}
                    submitLabel="Save"
                    onSubmit={saveSingleton}
                />
            </div>
        );
    }

    if (mode === 'create' || mode === 'edit') {
        return (
            <div>
                {header}
                <CrudForm
                    fields={fields}
                    initial={editing ?? {}}
                    submitLabel={mode === 'create' ? 'Create' : 'Update'}
                    onSubmit={mode === 'create' ? create : update}
                    onCancel={() => {
                        setMode('list');
                        setEditing(null);
                    }}
                />
            </div>
        );
    }

    const titleOf = ROW_TITLE[domainKey] ?? (() => 'Entry');
    const rows: Row[] = list.map((d) => ({
        _id: String(d._id),
        title: titleOf(d) || 'Untitled',
    }));

    return (
        <div>
            {header}
            <ReorderableList
                rows={rows}
                busyId={busyId}
                onEdit={(id) => {
                    setEditing(list.find((d) => d._id === id) ?? null);
                    setMode('edit');
                }}
                onDelete={remove}
                onMove={move}
            />
        </div>
    );
}
