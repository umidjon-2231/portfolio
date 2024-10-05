import {PropsWithChildren} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Umid's portfolio",
    description: "Portfolio of Umidjon Tojiboyev. Designed and coded by himself",
};

const Layout = ({children}: PropsWithChildren) => {
    return <div>
        {children}
    </div>;
};

export default Layout;