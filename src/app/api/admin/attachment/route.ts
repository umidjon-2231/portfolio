import {NextRequest} from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attachment from '@/db/scheme/attachment';
import {requireAdmin} from '@/lib/auth/session';
import {fail, ok} from '@/lib/admin/domain';

const ALLOWED = new Set([
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
]);
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

/** POST /api/admin/attachment — authenticated upload (MIME + size limited). */
export const POST = async (req: NextRequest) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    let form: FormData;
    try {
        form = await req.formData();
    } catch {
        return fail('Expected multipart/form-data', 400);
    }

    const file = form.get('file');
    if (!file || !(file instanceof File)) return fail('Pass a "file" field', 400);
    if (!ALLOWED.has(file.type)) return fail(`Unsupported type: ${file.type}`, 415);
    if (file.size > MAX_SIZE) return fail('File exceeds 5 MB', 413);

    await dbConnect();
    const category = (form.get('category') as string) || undefined;
    const attachment = new Attachment({
        name: file.name,
        contentType: file.type,
        size: file.size,
        category,
        content: Buffer.from(await file.arrayBuffer()),
    });
    await attachment.save();
    return ok({id: attachment._id}, 'Saved', 201);
};
