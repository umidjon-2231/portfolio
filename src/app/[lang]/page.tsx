import HomePage from "@/components/HomePage";
import React, {FC} from 'react';
import axios from "axios";

type PageProps = object

const Page: FC<PageProps> = async () => {
    console.log(new Date().getTime())
    const data = await axios.get(process.env.DOMAIN + "/api/info")
    console.log(new Date().getTime())
    console.log(data);
    return <HomePage info={(data.data).data}/>
};

export default Page;
