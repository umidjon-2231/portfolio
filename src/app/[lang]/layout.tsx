import {PropsWithChildren} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
    alternates: {
        canonical: "https://tojiboyevumidjon.uz/",
        languages: {
            'en': 'https://tojiboyevumidjon.uz/',
            'ru': 'https://tojiboyevumidjon.uz/ru',
            'uz': 'https://tojiboyevumidjon.uz/uz',
        },
    }
};

const Layout = async ({children}: PropsWithChildren) => {
    return children;
};

export default Layout;