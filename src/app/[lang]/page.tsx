import HomePage from "@/components/HomePage";
import React, {FC} from 'react';
import {LanguageEnum} from "@/locales";

interface PageProps {
    params: { lang: LanguageEnum }
}

console.log('lang page')
const Page: FC<PageProps> = ({params}) => {
    return <HomePage lang={params.lang}/>
};

export default Page;
