import HomePage from "@/components/HomePage";
import React, {FC} from 'react';
import {LanguageEnum} from "@/locales";
import axios from "axios";

interface PageProps {
    params: Promise<{ lang: LanguageEnum }>
}

const Page: FC<PageProps> = async props => {
    const params = await props.params;
    console.log(new Date().getTime())
    const data=await axios.get(process.env.DOMAIN+"/api/info")
    console.log(new Date().getTime())
    console.log(data);
    return <HomePage lang={params.lang} info={(data.data).data}/>
};

export default Page;
