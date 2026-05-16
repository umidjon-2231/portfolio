"use client"
import React, {FC, PropsWithChildren} from 'react';
import {AdminContext, sessionStorageTokenKey} from './context';
import AdminAuth from "@/components/admin/AdminAuth";
import {ReCaptchaProvider} from "next-recaptcha-v3";


const Layout: FC<PropsWithChildren> = ({children}) => {
    // NOTE: temporary client-storage gate — replaced by JWT cookie auth in Phase 2/3 (T14/T17).
    const [token] = React.useState<string | null>(() =>
        typeof window === "undefined" ? null : sessionStorage.getItem(sessionStorageTokenKey)
    );

    return (
        <AdminContext.Provider value={{token}}>
            <ReCaptchaProvider>
                {token ? children : <AdminAuth/>}
            </ReCaptchaProvider>
        </AdminContext.Provider>
    );
};

export default Layout;