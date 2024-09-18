import type {Metadata} from "next";
import "./styles/globals.css";
import React from "react";
import {ReCaptchaProvider} from "next-recaptcha-v3";


export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={``}
        >
        <ReCaptchaProvider>
            {children}
        </ReCaptchaProvider>
        </body>
        </html>
    );
}
