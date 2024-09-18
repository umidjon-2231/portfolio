import {customAlphabet} from "nanoid";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


export const generateRandomId = (length: number = 8) => {
    return customAlphabet(alphabet)(length);
}

export function checkStringForIp(ip: string | undefined | null){
    if(!ip){
        return false;
    }
    return /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})$/
        .test(ip)
}