import React, {FC, memo, useMemo, useState} from 'react';
import Image from "next/image"
import Logo from "../app/images/icons/logo.svg"
import Link from "next/link";
import {useDictionary} from "@/locales/hook";
import {LanguageEnum} from "@/locales";
import BlurBg from "@/components/UI/BlurBg";
import CVButton from "@/components/UI/CVButton";

type NavbarProps = {
    lang?: LanguageEnum | null,
}

const Navbar: FC<NavbarProps> = memo<NavbarProps>(({lang}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [dictionary] = useDictionary(lang);

    const items = useMemo(() => [
        {href: "#about", text: dictionary.navbar.items.about},
        {href: "#projects", text: dictionary.navbar.items.projects},
        {href: "#testimonials", text: dictionary.navbar.items.testimonials},
        {href: "#contact", text: dictionary.navbar.items.contact},
    ], [dictionary])


    function toggleNavbar() {
        setIsOpen(!isOpen)
    }

    return (
        <nav className={"py-5 flex items-center justify-between"}>
            <Link href={"/"} className="logo relative">
                <Image src={Logo} alt="logo" className={"w-[4rem] md:w-[5vw] h-[4rem] md:h-[5vw]"} width={150}
                       height={150}/>
            </Link>
            <div className="md:hidden">
                <div className="flex items-center justify-end h-16 sm:p-0">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="inline-flex bg-blur items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={toggleNavbar}
                        >
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"navigation md:flex hidden relative p-5"}>
                <BlurBg/>
                {items.map((i) => {
                    return <a className={"dark:hover:text-[var(--foreground)] dark:text-gray-500"} key={i.text}
                              href={i.href}>{i.text}</a>
                })}
                <div>
                    <CVButton/>
                </div>
            </div>
            <div
                className={`fixed inset-0 z-[1001] transition-transform duration-500 transform ${isOpen ? 'translate-x-1/2' : 'translate-x-[100%]'} bg-[var(--background)] md:hidden border-l border-[var(--secondary)]`}>
                <div className={"flex justify-start p-5 cursor-pointer"} onClick={toggleNavbar}>
                    <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div className="px-2 pt-2 pb-3">
                    {items.map(i => {
                        return <a key={i.text} href={i.href}
                                  className="text-[var(--foreground)] dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">
                            {i.text}</a>
                    })}
                    <div className={"mt-10 ms-2"}>
                        <CVButton/>
                    </div>
                </div>
            </div>

        </nav>
    );
});

Navbar.displayName = "Navbar"
export default Navbar;