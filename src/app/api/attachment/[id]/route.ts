import Attachment from "@/db/scheme/attachment";
import dbConnect from "@/lib/mongodb";

type Params = {
    id: string
}

export const GET = async (_req: Request, context: { params: Promise<Params> }) => {
    try {
        await dbConnect();
        const {id} = await context.params;
        const attachment = await Attachment.findById(id)
        if (!attachment) {
            return new Response(null, {status: 404})
        }
        return new Response(new Uint8Array(attachment.content), {
            headers: {
                "Content-Type": attachment.contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            }
        })
    } catch (e) {
        console.error(e)
        return Response.json({message: "Internal server error"}, {status: 500})
    }
}
