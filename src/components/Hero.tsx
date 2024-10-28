"use client"
import React, {FC, memo} from 'react';
import {DEFAULT_LANG, LanguageEnum, useDictionary} from "@/locales";
import {useGetInfoQuery} from "@/lib/redux/services/info/infoApiSlice";
import Skeleton from "react-loading-skeleton";
import SocialLinks from "@/components/SocialLinks";
import Avatar from "@/components/Avatar";

interface HeroProps {
    title: string;
    lang?: LanguageEnum
}

const IMAGE_SIZE = 350
const Hero: FC<HeroProps> = memo<HeroProps>(({title, lang = DEFAULT_LANG}) => {
    const {data, isLoading} = useGetInfoQuery();
    const [dictionary] = useDictionary(lang)

    return (
        <div className={"flex flex-col-reverse md:flex-row justify-center md:justify-between"}>
            <div className={"md:w-3/4  mt-5 md:mt-0"}>
                <div className={"text-center md:text-start"}>
                    <b className={"text-[3rem] md:text-[4rem]"}>{title}</b>
                </div>
                <div className={"w-full mt-5 md:ms-1"}>
                    <p>
                        {isLoading ? <Skeleton count={3}/> : (data?.shortBio[lang] || dictionary.hero.noBio)}
                    </p>
                    <div className={"my-3 flex"}>
                        <span className="material-symbols-outlined">location_on</span>
                        <b className={"w-1/2 md:w-1/4 ms-2"}>
                            {isLoading ? <Skeleton/> : (data?.city || dictionary.hero.noCity)}
                        </b>
                    </div>
                    <div className={"my-3 flex"}>
                        <span className="material-symbols-outlined">bolt</span>
                        <b className={"w-1/2 md:w-1/4 ms-2"}>
                            {isLoading ? <Skeleton/> : (data?.status[lang] || dictionary.hero.noStatus)}
                        </b>
                    </div>
                    <div className={"w-full mt-10"}>
                        <SocialLinks {...data?.socialLinks}/>
                    </div>
                </div>
            </div>
            <div className={"md:w-1/2 flex justify-center md:justify-end"}>
                <Avatar src={data?.avatar ? "/api/attachment/" + data.avatar : ""} image_size={IMAGE_SIZE}/>
            </div>
        </div>
    );
});

Hero.displayName = "Hero"
export default Hero;