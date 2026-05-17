import dns from "node:dns";
import mongoose, {ConnectOptions} from "mongoose";

declare global {
    // eslint-disable-next-line
    var mongoose: any;
}

// Workaround for `querySrv ECONNREFUSED` with mongodb+srv:// — Node's
// c-ares resolver can't always reach the system DNS (VPN/corp DNS/
// Windows), even when the OS resolves the SRV record fine. Point the
// resolver at reliable servers. Set DNS_SERVERS in .env to override
// (comma-separated); defaults to Cloudflare + Google.
if (process.env.MONGODB_URI?.startsWith("mongodb+srv://")) {
    const servers = (process.env.DNS_SERVERS || "1.1.1.1,8.8.8.8")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    try {
        dns.setServers(servers);
        dns.setDefaultResultOrder?.("ipv4first");
    } catch (e) {
        console.error("[mongodb] failed to set DNS servers:", e);
    }
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env",
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const opts: ConnectOptions = {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
    family: 4, // IPv4 — avoids flaky IPv6/DNS paths
};

// Retry the whole connect (which re-runs the SRV lookup) a few times so
// a transient `querySrv ECONNREFUSED` self-heals instead of rendering an
// empty site. The permanent cure for a network that flakes on SRV is a
// non-SRV (mongodb://host1,host2,…/db?replicaSet=…) connection string.
async function connectWithRetry(attempts = 4) {
    let lastErr: unknown;
    for (let i = 1; i <= attempts; i++) {
        try {
            return await mongoose.connect(MONGODB_URI, opts);
        } catch (e) {
            lastErr = e;
            console.error(
                `[mongodb] connect attempt ${i}/${attempts} failed:`,
                e instanceof Error ? e.message : e,
            );
            if (i < attempts) {
                await new Promise((r) => setTimeout(r, 800 * i));
            }
        }
    }
    throw lastErr;
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = connectWithRetry();
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;