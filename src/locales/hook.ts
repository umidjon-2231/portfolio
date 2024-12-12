"use client"
import {useMemo, useState} from "react";
import {dictionary, DictionaryType, LanguageEnum} from "@/locales/index";

export const useDictionary = (lang?: LanguageEnum | null): [DictionaryType, {
    language: LanguageEnum,
    setLanguage: (lang: LanguageEnum) => void
}] => {
    const [language, setLanguage] = useState<LanguageEnum>(lang ?? "en");

    const wrappedDic = useMemo<DictionaryType>(
        () => dictionary[language], [language])

    return [wrappedDic, {
        language: language, setLanguage
    }]
}