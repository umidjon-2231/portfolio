import {NextResponse} from 'next/server';
import {z} from 'zod';
import {services, SINGLETON_DOMAINS, type DomainKey} from '@/db/service';
import {validators} from '@/lib/validation';

export function isDomainKey(value: string): value is DomainKey {
    return Object.prototype.hasOwnProperty.call(services, value);
}

export function isSingleton(domain: DomainKey): boolean {
    return SINGLETON_DOMAINS.includes(domain);
}

export function getService(domain: DomainKey) {
    return services[domain];
}

export function getValidator(domain: DomainKey) {
    return validators[domain];
}

export function ok<T>(data: T, message = 'OK', status = 200) {
    return NextResponse.json({data, status: true, message}, {status});
}

export function fail(message: string, status = 400, data: unknown = null) {
    return NextResponse.json({data, status: false, message}, {status});
}

/** Parse a body with a Zod schema, returning a typed value or a 400 response. */
export function parseBody<S extends z.ZodTypeAny>(
    schema: S,
    body: unknown,
): {data: z.infer<S>} | {error: NextResponse} {
    const result = schema.safeParse(body);
    if (!result.success) {
        const issues = result.error.issues
            .map((i) => `${i.path.join('.') || 'body'}: ${i.message}`)
            .join('; ');
        return {error: fail(`Validation failed — ${issues}`, 422)};
    }
    return {data: result.data};
}
