import {NextResponse} from "next/server";
import dbConnect from "@/lib/mongodb";
import PersonalInfo, {IPersonalInfo} from "@/db/scheme/personalInfo";
import {DEFAULT_INFO} from "@/lib/types/testData";
import {Types} from "mongoose";
import Attachment, {IAttachment} from "@/db/scheme/attachment";

export const GET = async () => {
    try {
        await dbConnect();
        const info = await PersonalInfo.findOne<IPersonalInfo>();
        let avatarId: typeof Types.ObjectId | undefined = info?.avatar;

        if (!info) {
            avatarId = DEFAULT_INFO.avatar;
        }
        const attachment = await Attachment.findById<IAttachment>(avatarId)
        if (!attachment) {
            return new Response(null, {
                status: 404
            })
        }

        return new Response(attachment.content, {
            headers: {
                "Content-Type": attachment.contentType,
            }
        })

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: 'Something went wrong.'}, {status: 500});
    }
}