import en from "./en";
import {useMemo, useState} from "react";
import ru from "@/locales/ru";

export type LanguageEnum = "uz" | "ru" | "en"

export type Dictionary = {
    [key: (LanguageEnum)[number]]: typeof en;
}

export const DEFAULT_LANG: LanguageEnum = "en"

export const useDictionary = (lang?: LanguageEnum | null) => {
    console.log(lang)
    const [language, setLanguage] =
        useState<LanguageEnum>(lang ?? "en");

    const wrappedDic =
        useMemo(() => dictionary[language], [language])

    return {language, setLanguage, dictionary: wrappedDic}
}

export const dictionary: Dictionary = {
    en, ru
}
