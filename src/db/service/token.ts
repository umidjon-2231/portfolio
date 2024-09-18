import Token from "@/db/scheme/token";
import {generateRandomId} from "@/lib/auth";
import {getCurrentTime} from "@/lib/time";

export const createToken = async (ip: string, expireAt: Date) => {
    return await new Token({
        ip,
        expireAt,
        createdAt: getCurrentTime(),
        authKey: generateRandomId(16),
    }).save()
}