import dns from 'node:dns';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || '';
const redacted = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
console.log('URI       :', redacted || '(empty)');
console.log('Scheme    :', uri.startsWith('mongodb+srv://') ? 'mongodb+srv (SRV/DNS)' : 'mongodb (direct)');

if (uri.startsWith('mongodb+srv://')) {
    const servers = (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8').split(',').map(s => s.trim());
    dns.setServers(servers);
    console.log('DNS set to:', servers.join(', '));
}

(async () => {
    const t0 = Date.now();
    try {
        await mongoose.connect(uri, {serverSelectionTimeoutMS: 8000});
        const conn = mongoose.connection;
        console.log(`\n✅ CONNECTED in ${Date.now() - t0}ms`);
        console.log('Database  :', conn.name);
        console.log('Host      :', conn.host);
        const cols = await conn.db!.listCollections().toArray();
        if (!cols.length) {
            console.log('\n⚠️  Database is EMPTY — run `pnpm db:seed`.');
        } else {
            console.log('\nCollections & document counts:');
            for (const c of cols.sort((a, b) => a.name.localeCompare(b.name))) {
                const n = await conn.db!.collection(c.name).countDocuments();
                console.log(`  ${c.name.padEnd(16)} ${n}`);
            }
        }
        await mongoose.disconnect();
        process.exit(0);
    } catch (e: unknown) {
        const err = e as {name?: string; message?: string; reason?: unknown};
        console.log(`\n❌ FAILED after ${Date.now() - t0}ms`);
        console.log('Error name:', err.name);
        console.log('Message   :', err.message);
        if (err.reason) console.log('Reason    :', String(err.reason));
        process.exit(1);
    }
})();
