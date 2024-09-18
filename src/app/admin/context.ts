import {createContext} from "react";

interface ContextProps{
    token: string | null
}
export const sessionStorageTokenKey="adminToken"
export const AdminContext=createContext<ContextProps>({
    token: null,
})