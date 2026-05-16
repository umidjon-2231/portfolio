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

type Ctx = {params: Promise<{domain: string}>};

/** GET /api/admin/[domain] — list (collection) or the single doc (singleton). */
export const GET = async (_req: NextRequest, ctx: Ctx) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    const {domain} = await ctx.params;
    if (!isDomainKey(domain)) return fail('Unknown domain', 404);

    const service = getService(domain);
    if (isSingleton(domain)) {
        return ok(await service.getSingleton(), 'OK');
    }
    return ok(await service.list({sort: {order: 1}}), 'OK');
};

/** POST /api/admin/[domain] — create (collection) or upsert (singleton). */
export const POST = async (req: NextRequest, ctx: Ctx) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    const {domain} = await ctx.params;
    if (!isDomainKey(domain)) return fail('Unknown domain', 404);

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return fail('Bad request body', 400);
    }

    const parsed = parseBody(getValidator(domain), body);
    if ('error' in parsed) return parsed.error;

    const service = getService(domain);
    if (isSingleton(domain)) {
        const doc = await service.upsertSingleton(parsed.data as never);
        return ok(doc, 'Saved');
    }
    const doc = await service.create(parsed.data as never);
    return ok(doc, 'Created', 201);
};
