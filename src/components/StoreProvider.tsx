"use client";
import {createContext, PropsWithChildren} from "react";
import {LanguageEnum} from "@/locales";
import {useParams} from "next/navigation";
import useThemeDetector from "@/lib/hooks/useThemeDetector";

export type MainContextType = {
    lang: LanguageEnum
    theme: "light" | "dark"
}
export const MainContext = createContext<MainContextType>({
    lang: "en",
    theme: "light"
})

export const StoreProvider = ({children}: PropsWithChildren) => {
    const params = useParams()
    const theme=useThemeDetector()

    return (
        <MainContext value={{lang: (params.lang as LanguageEnum) ?? "en", theme}}>
            {children}
        </MainContext>
    );
};
