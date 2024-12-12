import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import {DEFAULT_INFO} from "@/lib/types/testData";
import PersonalInfo from "@/db/scheme/personalInfo";

export const GET = async () => {
    try {
        await dbConnect();
        const info = await PersonalInfo.findOne();
        if (!info) {
            // return NextResponse.json({message: "No personal info"}, {status: 400});
            return NextResponse.json({
                data: DEFAULT_INFO,
                message: "Found",
                status: true,
            });
        }
        return NextResponse.json({
            data: info,
            message: "Found",
            status: true,
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'Something went wrong.'}, {status: 500});
    }
}