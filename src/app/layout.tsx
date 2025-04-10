import type { Metadata } from "next";
import "./styles/chat.css";
import "./styles/globals.css";
import React from "react";
import { Inria_Sans } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Chat from "@/components/Chat";
import NoPrerender from "@/components/NoPrerender";
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
            en: "https://tojiboyevumidjon.uz/en",
            ru: "https://tojiboyevumidjon.uz/ru",
        },
    },
};

const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const gaId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!;
    
    return (
        <StoreProvider>
            <html lang={"en"}>
                <body className={inria.className}>
                    {/*<Loading>*/}
                    <SkeletonTheme
                        baseColor="var(--skeleton-base)"
                        highlightColor="var(--skeleton-highlight)"
                    >
                        {children}
                    </SkeletonTheme>
                    <Chat />
                    <NoPrerender />
                    {/*</Loading>*/}
                </body>
                {gaId && <GoogleAnalytics gaId={gaId} />}
            </html>
        </StoreProvider>
    );
}
