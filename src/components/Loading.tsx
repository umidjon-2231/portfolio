"use client"
import React, {createContext, FC, memo, PropsWithChildren, useContext, useState} from 'react';


interface LoadingContextType {
    showLoading: () => void;
    hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context
};

const Loading: FC<PropsWithChildren> = memo<PropsWithChildren>(({children}) => {
    const [loading, setLoading] = useState(true);

    return (
        <LoadingContext value={{showLoading: () => setLoading(true), hideLoading: () => setLoading(false)}}>
            {loading &&
                <div
                    className="flex items-center justify-center min-h-screen fixed backdrop-blur-[2px] inset-0 z-[1060]"
                >
                    <div className="loader ease-linear rounded-full border-8 border-t-8  h-16 w-16"/>
                </div>
            }
            {children}
        </LoadingContext>
    );

});

Loading.displayName = "Loading"
export default Loading;