// NavMobile.jsx - Simplified with components
import { useState } from "react";
import { CartIcon } from "./CartIcon";
import { ChevronDown, Menu, User, Heart, X } from "lucide-react";

import { NavLink } from "./NavLink";
import { useMenu } from "@/hooks/useMenu";
import { ContentSwitcher } from "./ContentSwitcher";

export default function NavMobile() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("links-main");
    const [currentSubmenu, setCurrentSubmenu] = useState(null);
    const { menuData } = useMenu();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="flex p-4 gap-4 justify-between">
            <NavLink link="/" classes="shrink-0 text-lg font-semibold"> 
                <h1>DAYE JEWELLERY</h1> 
            </NavLink>
            <NavLink link="#" onClick={toggleMenu}>
                <Menu size={24} />
            </NavLink>

            {isOpen && (
                <div className="fixed h-full backdrop-blur-xs bg-dark/25 inset-0 z-[1000]">
                    <div className="h-full w-7/8 flex flex-col p-4 justify-between bg-white border-r-2 border-dark/25">
                        
                        <div className="w-full flex justify-between">  
                            <NavLink link="#" onClick={toggleMenu}>
                                <X size={28} />
                            </NavLink>

                            <NavLink link="#" classes="flex items-center gap-1">
                                <p className="border-b-1 border-dark/50">AUD</p>
                                <ChevronDown size={20} />
                            </NavLink>
                        </div>

                        <div className="overflow-y-auto"> 
                            <ContentSwitcher 
                                content={content}
                                menuData={menuData}
                                currentSubmenu={currentSubmenu}
                                onContentChange={setContent}
                                onSubmenuSelect={setCurrentSubmenu}
                            />
                        </div>

                        <div className="flex gap-12 items-center justify-center">
                            <NavLink 
                                link="#" 
                                onClick={() => setContent("links-main")}
                                classes={content === "links-main" ? "text-blue" : ""}
                            > 
                                <Menu size={28} /> 
                            </NavLink>
                            <NavLink link="#"> 
                                <User size={28} /> 
                            </NavLink>
                            <NavLink link="#"> 
                                <Heart size={28} /> 
                            </NavLink>
                            <CartIcon 
                                size={28} 
                                onClick={() => setContent("cart")}
                                classes={content === "cart" ? "text-blue" : ""} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}