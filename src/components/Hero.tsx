"use client"
import React, {FC, memo} from 'react';
import SocialLinks from "@/components/UI/SocialLinks";
import Avatar from "@/components/UI/Avatar";
import {googleOutline} from "@/app/fonts";
import {IPersonalInfo} from "@/db/scheme/personalInfo";
import {useDictionary} from "@/locales/hook";
import BlurBg from "@/components/UI/BlurBg";

interface HeroProps {
    data: IPersonalInfo
}

const IMAGE_SIZE = 300
const Hero: FC<HeroProps> = memo<HeroProps>(({data}) => {
    const [dictionary, {language}] = useDictionary()

    return (
        <div className={"flex flex-col-reverse md:flex-row justify-center md:justify-between"}>
            <div className={"md:w-3/4 mt-5 md:mt-0 relative shadow rounded-3xl p-5 px-8"}>
                <BlurBg/>
                <div className={"text-center md:text-start text-[3rem] md:text-[4rem] flex align-middle"}>
                    <b className={" "}>{dictionary.hero.title}</b>
                    {/*<div className={"hi-title"}> 👋</div>*/}
                </div>
                <div className={"w-full mt-5 md:ms-1"}>
                    <p>
                        {(data?.shortBio[language] || dictionary.hero.noBio)}
                    </p>
                    <div className={"my-3 flex"}>
                        <span className={googleOutline.className}>location_on</span>
                        <b className={"w-1/2 md:w-1/4 ms-2"}>
                            {(data?.city || dictionary.hero.noCity)}
                        </b>
                    </div>
                    <div className={"my-3 flex"}>
                        <span className={googleOutline.className}>bolt</span>
                        <b className={"w-1/2 md:w-1/4 ms-2"}>
                            {(data?.status[language] || dictionary.hero.noStatus)}
                        </b>
                    </div>
                    <div className={"w-full mt-10"}>
                        <SocialLinks {...data?.socialLinks}/>
                    </div>
                </div>
            </div>
            <div className={"md:w-1/2 flex justify-center md:justify-end items-center"}>
                <Avatar src={data?.avatar ? "/api/attachment/" + data.avatar : ""} image_size={IMAGE_SIZE}/>
            </div>
        </div>
    );
});

Hero.displayName = "Hero"
export default Hero;