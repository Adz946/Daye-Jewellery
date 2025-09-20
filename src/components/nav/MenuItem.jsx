import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLink } from "./NavLink";

export function MenuItem({ menuItem, variant = "mobile", onClick = null, className = "" }) {
    if (variant === "mobile") {
        return (
            <NavLink 
                link={menuItem.hasSubmenu ? "#" : menuItem.link}
                onClick={menuItem.hasSubmenu ? () => onClick(menuItem) : null}
                classes={`flex items-center text-start text-2xl ${className}`}
            >
                <p className="w-2/3">{menuItem.title}</p>
                {menuItem.hasSubmenu && <ArrowRight size={28} />}
            </NavLink>
        );
    }

    return (
        <NavLink 
            link={menuItem.hasSubmenu ? "#" : menuItem.link} 
            classes={`text-md flex items-center gap-1 ${menuItem.hasSubmenu ? 'cursor-pointer' : ''} ${className}`}
        >
            <p>{menuItem.title}</p>
            {menuItem.hasSubmenu && <ChevronDown size={16} />}
        </NavLink>
    );
}