import bcrypt from 'bcryptjs';

/**
 * Verify a plaintext password against the bcrypt hash in
 * ADMIN_PASSWORD_HASH. Generate the hash once with:
 *   pnpm dlx tsx -e "import b from 'bcryptjs';console.log(b.hashSync('YOURPASS',12))"
 */
export async function verifyPassword(plain: string): Promise<boolean> {
    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
        throw new Error('ADMIN_PASSWORD_HASH is not set in .env');
    }
    if (!plain) return false;
    try {
        return await bcrypt.compare(plain, hash);
    } catch {
        return false;
    }
}

/** Helper for generating a hash (used by docs/scripts, not at runtime). */
export function hashPassword(plain: string): string {
    return bcrypt.hashSync(plain, 12);
}
