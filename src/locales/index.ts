import en from "./en";
import ru from "./ru";

export type LanguageEnum = "uz" | "ru" | "en"

export type Dictionary = {
    [key: (LanguageEnum)[number]]: typeof en;
}

export type DictionaryType = typeof en;

export const DEFAULT_LANG: LanguageEnum = "en"


export const dictionary: Dictionary = {
    en, ru
}
