"use client"
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {AdminContext, sessionStorageTokenKey} from './context';
import AdminAuth from "@/components/AdminAuth";
import {ReCaptchaProvider} from "next-recaptcha-v3";


const Layout: FC<PropsWithChildren> = ({children}) => {
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        const localToken = sessionStorage?.getItem(sessionStorageTokenKey);
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    return (
        <AdminContext.Provider value={{token}}>
            <ReCaptchaProvider>
                {token ? children : <AdminAuth/>}
            </ReCaptchaProvider>
        </AdminContext.Provider>
    );
};

export default Layout;