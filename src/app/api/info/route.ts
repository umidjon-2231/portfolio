import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/db/scheme/personalInfo";

export const GET = async () => {
    try {
        await dbConnect();
        const info = await PersonalInfo.findOne();
        if (!info) {
            return NextResponse.json({message: "No personal info"}, {status: 400});
        }
        return NextResponse.json(info);
    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'Something went wrong.'}, {status: 500});
    }
}