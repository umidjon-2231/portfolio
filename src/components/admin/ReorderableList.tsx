'use client';
import {FC} from 'react';

export interface Row {
    _id: string;
    title: string;
}

interface Props {
    rows: Row[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onMove: (id: string, dir: -1 | 1) => void;
    busyId?: string | null;
}

const ReorderableList: FC<Props> = ({rows, onEdit, onDelete, onMove, busyId}) => {
    if (!rows.length) {
        return <p className="text-sm text-neutral-600">No entries yet.</p>;
    }
    return (
        <ul className="divide-y divide-neutral-800 rounded-xl border border-neutral-800">
            {rows.map((r, i) => (
                <li
                    key={r._id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                        busyId === r._id ? 'opacity-50' : ''
                    }`}
                >
                    <div className="flex flex-col">
                        <button
                            type="button"
                            disabled={i === 0}
                            onClick={() => onMove(r._id, -1)}
                            className="text-neutral-600 hover:text-neutral-300 disabled:opacity-30 leading-none"
                            aria-label="Move up"
                        >
                            ▲
                        </button>
                        <button
                            type="button"
                            disabled={i === rows.length - 1}
                            onClick={() => onMove(r._id, 1)}
                            className="text-neutral-600 hover:text-neutral-300 disabled:opacity-30 leading-none"
                            aria-label="Move down"
                        >
                            ▼
                        </button>
                    </div>
                    <span className="flex-1 truncate text-sm">{r.title}</span>
                    <button
                        type="button"
                        onClick={() => onEdit(r._id)}
                        className="rounded-md border border-neutral-800 px-3 py-1 text-xs hover:bg-neutral-900"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(r._id)}
                        className="rounded-md border border-neutral-800 px-3 py-1 text-xs text-neutral-500 hover:text-red-400"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ReorderableList;
