import Attachment from "@/db/scheme/attachment";

export const POST = async (req: Request,) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        if (!file || !(file instanceof File)) {
            return Response.json({message: "Pass file"}, {
                status: 400
            })
        }
        const attachment = new Attachment({
            name: file.name,
            contentType: file.type,
            size: file.size,
            content: Buffer.from(await file.arrayBuffer())
        })
        await attachment.save()
        return Response.json({
            message: "Saved",
            data: {
                id: attachment._id
            }
        }, {
            status: 201
        })
    } catch (e) {
        console.error(e)
        return new Response(null, {
            status: 500
        })
    }
}