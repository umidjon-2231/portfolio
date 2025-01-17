"use client";
import {createContext, PropsWithChildren} from "react";
import {LanguageEnum} from "@/locales";
import {useParams} from "next/navigation";

export type MainContextType = {
    lang: LanguageEnum
}
export const MainContext = createContext<MainContextType>({
    lang: "en",
})

export const StoreProvider = ({children}: PropsWithChildren) => {
    const params = useParams()

    return (
        <MainContext value={{lang: (params.lang as LanguageEnum) ?? "en"}}>
            <>
                {children}
            </>
        </MainContext>
    );
};
