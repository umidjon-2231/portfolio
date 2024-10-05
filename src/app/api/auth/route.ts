import {NextRequest, NextResponse} from "next/server";
import {verifyCaptcha} from "@/lib/recaptcha";
import {createToken} from "@/db/service/token";
import {INTERNALS} from "next/dist/server/web/spec-extension/request";
import {addHours} from "date-fns";
import {getCurrentTime} from "@/lib/time";
import {sendEmailToAdmin} from "@/lib/email";
import {sendCode} from "@/lib/email/templates";
import {checkStringForIp} from "@/lib/auth";
import dbConnect from "@/lib/mongodb";


export const POST = async (req: NextRequest) => {
    try {
        await dbConnect()
        let postData: { recaptchaToken: string };
        try {
            postData = await req.json();
        } catch (error) {
            console.error("Error parsing JSON body:", error);
            return NextResponse.json({success: false, error: "Bad request"}, {status: 400});
        }
        console.log(postData)
        const {success, error} = await verifyCaptcha(postData.recaptchaToken);
        console.log(success, error)
        if (!success) {
            return NextResponse.json({success: false, error}, {status: 400});
        }
        let clientIP = req.headers.get('x-forwarded-for') || req[INTERNALS].ip;
        if (!checkStringForIp(clientIP)) {
            clientIP = undefined;
        }
        const newToken = await createToken(clientIP ?? "", addHours(getCurrentTime(), 6));
        console.log(newToken);
        await sendEmailToAdmin(sendCode({
            ip: clientIP,
            code: newToken.authKey
        }))
        return NextResponse.json({success: true, error: "Success sent"});
    } catch (e) {
        console.error(e);
        return NextResponse.json({success: false, error: "Internal server error"}, {status: 500});
    }
}