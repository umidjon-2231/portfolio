"use client"
import React, {FC, memo} from 'react';
import {useDictionary} from "@/locales/hook";

interface ErrorContainerProps {
    msg?: string
}

const ErrorContainer: FC<ErrorContainerProps> = memo<ErrorContainerProps>(({msg}) => {
    const [dictionary] = useDictionary();

    return (
        <div>
            <b className={"text-red-600"}>{msg ?? dictionary.errors.something}</b>
        </div>
    );
});

ErrorContainer.displayName = "ErrorContainer"
export default ErrorContainer;