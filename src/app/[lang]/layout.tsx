import {PropsWithChildren} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
    alternates: {
        canonical: "https://tojiboyevumidjon.uz/",
        languages: {
            'en': 'https://tojiboyevumidjon.uz/en',
            'ru': 'https://tojiboyevumidjon.uz/ru',
        },
    }
};

const Layout = async ({children}: PropsWithChildren) => {
    return children;
};

export default Layout;