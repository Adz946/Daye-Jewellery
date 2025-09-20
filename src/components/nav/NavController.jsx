'use client';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import NavPrimary from "./NavPrimary";
import NavMobile from "./NavMobile";

export default function NavController() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    const fixedPositionPages = ["/"];
    const isFixedPage = fixedPositionPages.includes(pathname);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getPositionClasses = () => {
        if (isFixedPage) { return "fixed"; } 
        else { return "sticky mb-8"; }
    };

    return (
        <header className={`${getPositionClasses()} mx-8 top-5 left-0 right-0 bg-white rounded-lg shadow-lg z-[999]`}>
            {isMobile ? <NavMobile /> : <NavPrimary />}
        </header>
    );
}