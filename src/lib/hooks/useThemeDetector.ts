import {useEffect, useState} from "react";

const useThemeDetector = () => {
    const getCurrentTheme = () => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        } else {
            return "light";
        }
    }

    const [theme, setTheme] = useState<"dark" | "light">(getCurrentTheme());

    useEffect(() => {
        if (typeof window !== "undefined") {

            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

            const handleThemeChange = () => setTheme(getCurrentTheme());

            mediaQuery.addEventListener("change", handleThemeChange);
            return () => mediaQuery.removeEventListener("change", handleThemeChange);
        } else {
            setTheme("light");
        }
    }, []);

    return theme;
};

export default useThemeDetector;
