"use client"
import React, {FC, memo, useMemo} from "react";
import Navbar from "@/components/Navbar";
import {LanguageEnum,} from "@/locales";
import Hero from "@/components/Hero";
import {IPersonalInfo} from "@/db/scheme/personalInfo";
import {useDictionary} from "@/locales/hook";

interface HomePageProps {
    lang?: LanguageEnum | null,
    info: IPersonalInfo
}

const HomePage: FC<HomePageProps> = memo<HomePageProps>(({lang, info}) => {
    const [dictionary, {language}] = useDictionary();

    const navItems = useMemo(() => [
        {href: "#about", text: dictionary.navbar.items.about},
        {href: "#projects", text: dictionary.navbar.items.projects},
        {href: "#testimonials", text: dictionary.navbar.items.testimonials},
        {href: "#contact", text: dictionary.navbar.items.contact},
    ], [dictionary])

    return (
        <div className={"container mx-auto px-4"}>
            <Navbar items={navItems} downloadCV={dictionary.navbar.downloadCv}/>
            <Hero title={dictionary.hero.title} lang={lang ?? language} data={info}/>
        </div>
    );
});

HomePage.displayName = "HomePage"
export default HomePage