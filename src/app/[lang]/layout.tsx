import {PropsWithChildren} from "react";
import type {Metadata} from "next";
import {LanguageEnum} from "@/locales";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
};

interface PageProps extends PropsWithChildren {
    params: Promise<{ lang: LanguageEnum }>
}

const Layout = async (props: PageProps) => {
    // const params = await props.params;

    return <div>
        {/*<MainContext value={{lang: params.lang}}>*/}
        {props.children}
        {/*</MainContext>*/}
    </div>;
};

export default Layout;