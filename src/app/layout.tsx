import type {Metadata} from "next";
import "./styles/globals.css";
import React from "react";
import Loading from "@/components/Loading";
import {Inria_Sans} from "next/font/google"

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
};

const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={inria.className}
        >
        <Loading>
            {children}
        </Loading>
        </body>
        </html>
    );
}
