import axios from "axios";

export const verifyCaptcha = async (token: string) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.error("RECAPTCHA_SECRET_KEY is not set in environment variables.");
        return {success: false, error: "Server configuration error"}
    }
    const formData = `secret=${secretKey}&response=${token}`;

    try {
        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        if (response.data.success && response.data.score > 0.5) {
            return {
                success: true,
                score: response.data.score,
            };
        } else {
            console.error("ReCaptcha verification failed:", response.data);
            return {success: false, error: "ReCaptcha verification failed"}
        }
    } catch (error) {
        console.error("Error during ReCaptcha verification:", error);
        return {success: false, error: "Internal server error"}
    }
}