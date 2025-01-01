import HomePage from "@/components/HomePage";
import axios from "axios";
import React from "react";

export default async function Home() {
    console.log(new Date().getTime())
    const data=await axios.get(process.env.DOMAIN+"/api/info")
    console.log(new Date().getTime())
    console.log(data);
    return <HomePage info={(data.data).data}/>
}
