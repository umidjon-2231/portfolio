import Attachment from "@/db/scheme/attachment";
import dbConnect from "@/lib/mongodb";

type Params = {
    id: string
}

export const GET = async (_req: Request, context: { params: Params }) => {
    try {
        await dbConnect();
        console.log(`Request to attachment ${context.params.id}`)
        const attachment = await Attachment.findById(context.params.id)
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
        console.error(e)
        return Response.json({message: "Internal server error"}, {
            status: 500
        })
    }
}