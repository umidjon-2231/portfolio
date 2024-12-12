import HomePage from "@/components/HomePage";
console.log('root page')

export default async function Home() {
    const data=await fetch("http://localhost:3000/api/info")
    console.log(data);
    return <HomePage info={(await data.json()).data}/>
}
