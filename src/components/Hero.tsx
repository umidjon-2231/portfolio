"use client"
import React, {FC, memo} from 'react';
import {DEFAULT_LANG, LanguageEnum} from "@/locales";
import {useGetInfoQuery} from "@/lib/redux/services/info/infoApiSlice";
import Skeleton from "react-loading-skeleton";
import {skipToken} from "@reduxjs/toolkit/query";

interface HeroProps {
    title: string;
    lang: LanguageEnum
}

const Hero: FC<HeroProps> = memo<HeroProps>( ({title, lang}) => {
    const {data, isLoading } = useGetInfoQuery();

    return (
        <div className={"hero flex justify-between"}>
            <div>
                <b className={"hero-title"}>{title}</b>
            </div>
            <div>
                {isLoading ? <Skeleton count={3}/> : (data?.bio[lang ?? DEFAULT_LANG])}
            </div>
        </div>
    );
});

Hero.displayName = "Hero"
export default Hero;