import {NextRequest} from 'next/server';
import {requireAdmin} from '@/lib/auth/session';
import {
    fail,
    getService,
    getValidator,
    isDomainKey,
    isSingleton,
    ok,
    parseBody,
} from '@/lib/admin/domain';

type Ctx = {params: Promise<{domain: string; id: string}>};

/** PUT /api/admin/[domain]/[id] — update one collection document. */
export const PUT = async (req: NextRequest, ctx: Ctx) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    const {domain, id} = await ctx.params;
    if (!isDomainKey(domain)) return fail('Unknown domain', 404);
    if (isSingleton(domain)) return fail('Singleton: use POST /api/admin/' + domain, 400);

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return fail('Bad request body', 400);
    }

    const parsed = parseBody(getValidator(domain), body);
    if ('error' in parsed) return parsed.error;

    const doc = await getService(domain).update(id, parsed.data as never);
    if (!doc) return fail('Not found', 404);
    return ok(doc, 'Updated');
};

/** DELETE /api/admin/[domain]/[id] — delete one collection document. */
export const DELETE = async (_req: NextRequest, ctx: Ctx) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    const {domain, id} = await ctx.params;
    if (!isDomainKey(domain)) return fail('Unknown domain', 404);
    if (isSingleton(domain)) return fail('Singletons cannot be deleted', 400);

    const removed = await getService(domain).remove(id);
    if (!removed) return fail('Not found', 404);
    return ok(null, 'Deleted');
};
