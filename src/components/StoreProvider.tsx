"use client";
import {createContext, PropsWithChildren} from "react";


export const MainContext = createContext({})

export const StoreProvider = ({children}: PropsWithChildren) => {
    return <MainContext value={{}}>{children}</MainContext>;
};
