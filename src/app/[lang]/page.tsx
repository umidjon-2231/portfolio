import HomePage from "@/components/HomePage";
import React, {FC} from 'react';
import axios from "axios";

type PageProps = object

const Page: FC<PageProps> = async () => {
    let info = null;
    try {
        const req = await axios.get(process.env.DOMAIN + "/api/info")
        info = req.data?.data;
    } catch (e) {
        console.log(e)
    }
    if (!info) return <div>Something went wrong!</div>;
    return <HomePage info={info}/>;
};

export default Page;
