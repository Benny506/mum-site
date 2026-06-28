import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ evtToChange }){
    const pathname = useLocation().pathname;
    const prevPathname = useRef(pathname);

    useEffect(() => {
        const isModalTransition = 
            (prevPathname.current === "/" && pathname === "/download") ||
            (prevPathname.current === "/download" && pathname === "/");

        if (!isModalTransition) {
            window.scrollTo(0, 0);
        }
        
        prevPathname.current = pathname;
    }, [pathname, evtToChange]);

    return null;
}