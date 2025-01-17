import HomePage from "@/components/HomePage";
import React, {FC} from 'react';
import axios from "axios";

type PageProps = object

const Page: FC<PageProps> = async () => {
    try{
        const req = await axios.get(process.env.DOMAIN + "/api/info")
        return <HomePage info={(req.data).data}/>
    }catch (e) {
        console.log(e)
        return <div>Something went wrong!</div>
    }
};

export default Page;
