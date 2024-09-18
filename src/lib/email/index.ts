import nodemailer from 'nodemailer';

const HOST = process.env.EMAIL_HOST,
    PORT = parseInt(process.env.EMAIL_PORT ?? ""),
    EMAIL_USER = process.env.EMAIL_USER,
    EMAIL_PASS = process.env.EMAIL_PASS,
    ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (!PORT || isNaN(PORT) || !HOST || !EMAIL_USER || !EMAIL_PASS || !ADMIN_EMAIL) {
    throw new Error("Missing required argument for email");
}

const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});

export async function sendEmailToAdmin({subject, message}: {subject: string, message: string}) {
    try {
        const mailOptions = {
            from: EMAIL_USER,
            to: ADMIN_EMAIL,
            subject,
            html: message,
        };
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log(e);
        console.log("Something went wrong");
    }
}