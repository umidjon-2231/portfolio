import React from 'react';
import {useDictionary} from "@/locales/hook";

const CvButton = () => {
    const [dictionary] = useDictionary()

    return (
        <a download={"Tojiboyev Umidjon's CV.pdf"}
           className={"bg-[var(--secondary)] hover:bg-[var(--foreground)] dark:text-gray-900 text-white p-2 rounded-xl"}
           href="/cv.pdf">{dictionary.navbar.downloadCv}</a>
    );
};

export default CvButton;