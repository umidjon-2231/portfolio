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

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts: ConnectOptions = {

        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
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