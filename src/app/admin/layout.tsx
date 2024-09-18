"use client"
import React, {FC, PropsWithChildren, useEffect} from 'react';
import {AdminContext, sessionStorageTokenKey} from './context';
import AdminAuth from "@/components/AdminAuth";


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
            {token?children:<AdminAuth/>}
        </AdminContext.Provider>
    );
};

export default Layout;