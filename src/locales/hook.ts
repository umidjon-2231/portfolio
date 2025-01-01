"use client"
import {use, useMemo, useState} from "react";
import {dictionary, DictionaryType, LanguageEnum} from "@/locales/index";
import {MainContext} from "@/components/StoreProvider";

export const useDictionary = (lang?: LanguageEnum | null): [DictionaryType, {
    language: LanguageEnum,
    setLanguage: (lang: LanguageEnum) => void
}] => {
    const {lang: contextLang}=use(MainContext)
    const [language, setLanguage] = useState<LanguageEnum>(lang ?? (contextLang??"en"));

    const wrappedDic = useMemo<DictionaryType>(
        () => dictionary[language], [language])

    return [wrappedDic, {
        language: language, setLanguage
    }]
}