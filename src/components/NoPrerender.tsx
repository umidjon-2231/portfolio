"use client"
import React from 'react';
import dynamic from "next/dynamic";

const BackgroundAnimation = dynamic(
    () => import("@/components/UI/BackgroundAnimation"),
    {ssr: false}
)

const NoPrerender = () => {
    return (
        <>
            <BackgroundAnimation/>
        </>
    );
};

export default NoPrerender;