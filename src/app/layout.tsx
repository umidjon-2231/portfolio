import type {Metadata} from "next";
import "./styles/globals.css";
import React from "react";
import {Inria_Sans} from "next/font/google"
import {StoreProvider} from "@/components/StoreProvider";
import 'react-loading-skeleton/dist/skeleton.css'
import {SkeletonTheme} from "react-loading-skeleton";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself!",
    keywords: ["Umid", "Umidjon", "Tojiboyev", "Umidjon Tojiboyev" ,
        "portfolio", "web developer", "react", "typescript", "next.js", "tashkent", "uzbekistan"],
};

const inria = Inria_Sans({weight: ["300", "400", "700"], subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang={"en"}>
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet"/>
            </head>
            <body
                className={inria.className}
            >
            {/*<Loading>*/}
            <SkeletonTheme baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)">
                {children}
            </SkeletonTheme>
            {/*</Loading>*/}
            </body>
            </html>
        </StoreProvider>
    );
}
