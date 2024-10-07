"use client"
import {useLoading} from "@/components/Loading";
import React, {FC, memo, useEffect, useMemo} from "react";
import Navbar from "@/components/Navbar";
import {LanguageEnum, useDictionary} from "@/locales";
import Hero from "@/components/Hero";

interface HomePageProps {
    lang?: LanguageEnum | null
}

const HomePage: FC<HomePageProps> = memo<HomePageProps>(({lang}) => {
    const {dictionary, language} = useDictionary(lang);

    const navItems = useMemo(() => [
        {href: "#about", text: dictionary.navbar.items.about},
        {href: "#projects", text: dictionary.navbar.items.projects},
        {href: "#testimonials", text: dictionary.navbar.items.testimonials},
        {href: "#contact", text: dictionary.navbar.items.contact},
    ], [dictionary])

    return (
        <div className={"container mx-auto px-4"}>
            <Navbar items={navItems} downloadCV={dictionary.navbar.downloadCv}/>
            <Hero title={dictionary.hero.title} lang={lang ?? language}/>
        </div>
    );
});

HomePage.displayName = "HomePage"
export default HomePage