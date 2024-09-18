import {getCurrentTime, parseTime} from "@/lib/time";

export type Template<T>=(args: T)=>{subject: string, message: string};

export const DOMAIN="tojiboyevumidjon.uz"

export const sendCode: Template<{ code: string, ip?: string, }>= (args)=>{
    return {
        subject: "Login Attempt to admin panel",
        message: `<h1 style="text-align: center">Login Attempt to admin panel <a href="https://${DOMAIN}">${DOMAIN}</a></h1><div style="font-size: 2rem"><br>IP: <b>${args.ip??"Not found"}</b><br>Time: <b>${parseTime(
            getCurrentTime())}</b><br>Your code: <br><br><div style="padding: 10px; background: #000; border: 2px solid #fff; font-weight: bold">${
            args.code}</div><br><br><a href="https://tojiboyevumidjon.uz/admin">Go to admin panel</a></div>`
    }
}