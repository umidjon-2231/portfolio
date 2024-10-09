import en from "./en";
import {useMemo, useState} from "react";
import ru from "./ru";

export type LanguageEnum = "uz" | "ru" | "en"

export type Dictionary = {
    [key: (LanguageEnum)[number]]: typeof en;
}

export type DictionaryType = typeof en;

export const DEFAULT_LANG: LanguageEnum = "en"

export const useDictionary = (lang?: LanguageEnum | null): [DictionaryType, {
    language: LanguageEnum,
    setLanguage: (lang: LanguageEnum) => void
}] => {
    const [language, setLanguage] =
        useState<LanguageEnum>(lang ?? "en");

    const wrappedDic =
        useMemo<DictionaryType>(() => dictionary[language], [language])

    return [wrappedDic, {language, setLanguage}]
}

export const dictionary: Dictionary = {
    en, ru
}
