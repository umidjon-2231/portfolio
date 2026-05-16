import type { Metadata } from "next";
import "./styles/chat.css";
import "./styles/globals.css";
import React from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Chat from "@/components/Chat";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description:
        "Portfolio of Umidjon Tojiboyev. Designed and coded by himself!",
    keywords: [
        "Umid",
        "Umidjon",
        "Tojiboyev",
        "Umidjon Tojiboyev",
        "portfolio",
        "web developer",
        "react",
        "typescript",
        "next.js",
        "tashkent",
        "uzbekistan",
    ],
    creator: "Umidjon Tojiboyev",
    alternates: {
        canonical: "https://tojiboyevumidjon.uz/",
        languages: {
            en: "https://tojiboyevumidjon.uz/",
            ru: "https://tojiboyevumidjon.uz/ru",
            uz: "https://tojiboyevumidjon.uz/uz",
        },
    },
};

const grotesk = Space_Grotesk({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-grotesk",
    display: "swap",
});
const mono = JetBrains_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-mono-jb",
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const gaId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
    
    return (
        <StoreProvider>
            <html lang={"en"} className={`${grotesk.variable} ${mono.variable}`}>
                <body className={"font-sans antialiased"}>
                    {/*<Loading>*/}
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        {children}
                    </SkeletonTheme>
                    <Chat />
                    {/*</Loading>*/}
                </body>
                {gaId && <GoogleAnalytics gaId={gaId} />}
            </html>
        </StoreProvider>
    );
}
