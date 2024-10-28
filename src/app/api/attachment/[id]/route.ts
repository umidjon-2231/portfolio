import Attachment from "@/db/scheme/attachment";

type Params = {
    id: string
}

export const GET = async (req: Request, context: { params: Params }) => {
    try {
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