"use client"
import React, {FC, memo} from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {IPersonalInfo} from "@/db/scheme/personalInfo";

interface HomePageProps {
    info: IPersonalInfo
}

const HomePage: FC<HomePageProps> = memo<HomePageProps>(({info}) => {

    return (
        <div className={"container mx-auto px-4"}>
            <Navbar/>
            <Hero data={info}/>
        </div>
    );
});

HomePage.displayName = "HomePage"
export default HomePage