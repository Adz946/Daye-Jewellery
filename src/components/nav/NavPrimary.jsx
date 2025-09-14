// NavPrimary.jsx - Updated with MenuDropdown component
import { useState } from "react";
import { Heart, Search, User, ChevronDown } from "lucide-react";

import { NavLink } from "./NavLink";
import { CartIcon } from "./CartIcon";
import { MenuDropdown } from "./MenuDropdown";
import { MenuItem } from "./MenuItem";
import { useMenu } from "@/hooks/useMenu";

export default function NavPrimary() {
    const [query, setQuery] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { menuData, loading, error } = useMenu();

    if (loading) return <nav className="flex px-12 py-4 justify-between">Loading...</nav>;
    if (error) return <nav className="flex px-12 py-4 justify-between">Error loading menu</nav>;

    const handleMenuHover = (menuId) => {
        setActiveDropdown(menuId);
    };

    const handleMenuLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <nav className="flex px-12 py-4 justify-between">
            {/* LINKS */}
            <div className="flex gap-8 items-center justify-start">
                <NavLink link="/" classes="shrink-0 text-2xl font-semibold"> 
                    <h1>DAYE JEWELLERY</h1> 
                </NavLink>

                <ul className="hidden xl:flex gap-6 items-center">
                    {menuData?.mainNavigation.map((menuItem) => (
                        <li key={menuItem.id} className="relative">
                            <div onMouseEnter={() => handleMenuHover(menuItem.id)} onMouseLeave={handleMenuLeave}>
                                <MenuItem 
                                    menuItem={menuItem}
                                    variant="desktop"
                                />
                                
                                <MenuDropdown 
                                    menuItem={menuItem}
                                    isOpen={activeDropdown === menuItem.id}
                                    onClose={() => setActiveDropdown(null)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* OTHERS */}
            <div className="flex gap-8 items-center justify-end">
                <div className="hidden w-[200px] xl:flex items-center border-b-2 border-dark/10">
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search"
                        className="w-full py-2 outline-none placeholder:text-dark/50"/>
                    <Search size={20} className="text-dark" />
                </div>

                <div className="hidden xl:flex gap-8 items-center">
                    <NavLink link="#"> <User size={24} className="animate hover:text-blue" /> </NavLink>
                    <NavLink link="#"> <Heart size={24} className="animate hover:text-blue" /> </NavLink>
                    <CartIcon />

                    <NavLink link="#" classes="flex items-center gap-1">
                        <p className="border-b-1 border-dark/50">AUD</p>
                        <ChevronDown size={16} />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}