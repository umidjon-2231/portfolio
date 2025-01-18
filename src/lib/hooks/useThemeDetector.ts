import { useState, useEffect } from "react";

const useThemeDetector = () => {
    const getCurrentTheme = () =>
        window?.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";

    const [theme, setTheme] = useState<"dark" | "light">(getCurrentTheme());

    useEffect(() => {
        if (window){

            const mediaQuery = window?.matchMedia("(prefers-color-scheme: dark)");

            const handleThemeChange = () => setTheme(getCurrentTheme());

            mediaQuery.addEventListener("change", handleThemeChange);
            return () => mediaQuery.removeEventListener("change", handleThemeChange);
        }else {
            setTheme("light");
        }
    }, []);

    return theme;
};

export default useThemeDetector;
