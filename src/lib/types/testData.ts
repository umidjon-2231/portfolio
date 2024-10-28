import {IPersonalInfo} from "@/db/scheme/personalInfo";
import {Types} from "mongoose";

export const DEFAULT_INFO: IPersonalInfo = {
    shortBio: {
        en: "I am fullstack developer with 3 year of experience in coding.",
        ru: "Я FullStack разработчик с 3-летним опытом программирования.",
    },
    socialLinks: {
        github: "https://github.com/umidjon-2231",
        email: "mailto:tumidjon808@gmail.com",
        linkedin: "https://linkedin.com/in/tojiboyevumidjon",
        x: "https://x.com/t_umidcheek",
        instagram: "https://instagram.com/t_umidcheek",
        telegram: "https://t.me/tojiboyevumidjon",
    },
    city: "Tashkent, Uzbekistan",
    status: {
        en: "Ready to work",
        ru: "Готов к работе",
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    avatar: new Types.ObjectId("671fd632c7dad681bd75c3b9"),
}