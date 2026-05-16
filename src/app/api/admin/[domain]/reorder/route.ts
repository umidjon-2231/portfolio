import {NextRequest} from 'next/server';
import {z} from 'zod';
import {requireAdmin} from '@/lib/auth/session';
import {fail, getService, isDomainKey, isSingleton, ok} from '@/lib/admin/domain';

const reorderSchema = z.object({
    items: z
        .array(
            z.object({
                id: z.string().regex(/^[0-9a-fA-F]{24}$/),
                order: z.number().int(),
            }),
        )
        .min(1),
});

/** POST /api/admin/[domain]/reorder — persist new ordering. */
export const POST = async (req: NextRequest, ctx: {params: Promise<{domain: string}>}) => {
    const denied = await requireAdmin();
    if (denied) return denied;

    const {domain} = await ctx.params;
    if (!isDomainKey(domain)) return fail('Unknown domain', 404);
    if (isSingleton(domain)) return fail('Singletons are not reorderable', 400);

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return fail('Bad request body', 400);
    }

    const parsed = reorderSchema.safeParse(body);
    if (!parsed.success) return fail('Invalid reorder payload', 422);

    await getService(domain).reorder(parsed.data.items);
    return ok(null, 'Reordered');
};
