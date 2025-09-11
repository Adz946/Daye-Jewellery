"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ChevronDown, Menu, X, MoreHorizontal } from "lucide-react";
import { CartIcon } from "./CartIcon";

export default function FloatingNav() {
    const [query, setQuery] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [iconMenuOpen, setIconMenuOpen] = useState(false);

    // refs + event handlers
    const iconMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (iconMenuRef.current && !iconMenuRef.current.contains(e.target)) {
                setIconMenuOpen(false);
            }
        }
        function handleEsc(e) {
            if (e.key === "Escape") {
                setIconMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <header className="sticky top-5 my-8 z-[999]">
            <nav className="w-full rounded-xl shadow-sm border border-black/10 bg-white py-2">
                <div className="mx-auto px-6">
                    <div className="flex h-16 items-center justify-between gap-6">
                        {/* Left: Logo + Primary Links (Desktop and Tablet) */}
                        <div className="flex items-center gap-10 min-w-0">
                            <Link
                                href="/"
                                className="shrink-0 font-serif text-xl tracking-wide hover:opacity-80 transition-opacity"
                            >
                                DAYE JEWELLERY
                            </Link>

                            <ul className="hidden md:flex items-center gap-6 text-xs lg:gap-8 lg:text-sm shrink-0">
                                <li>
                                    <Link href="#" className="tracking-wide text-gray-800 hover:text-black transition-colors">
                                        ALL JEWELLERY
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="tracking-wide text-gray-800 hover:text-black transition-colors">
                                        NEW ARRIVALS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="tracking-wide text-gray-800 hover:text-black transition-colors">
                                        BEST SELLERS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="tracking-wide text-gray-800 hover:text-black transition-colors">
                                        ON SALE
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Right: Search + Icons + Menu Toggles */}
                        <div className="flex items-center gap-4 min-w-0">
                            {/* Search (only xl and up) */}
                            <div className="hidden xl:flex items-center gap-2 flex-1 min-w-[120px] max-w-[280px]">
                                <div className="relative w-full">
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search"
                                        className="peer w-full bg-transparent outline-none border-b border-black/20 focus:border-black/70 transition-colors py-1 pr-8 text-sm placeholder:text-gray-500"
                                    />
                                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 size-4 opacity-80" />
                                </div>
                            </div>

                            {/* Icons inline for lg+ */}
                            <div className="hidden lg:flex items-center gap-3 shrink-0">
                                <Link href="#" aria-label="Account" className="p-2 rounded-full hover:bg-black/5 transition-colors">
                                    <User className="size-5" />
                                </Link>
                                <Link href="#" aria-label="Wishlist" className="p-2 rounded-full hover:bg-black/5 transition-colors">
                                    <Heart className="size-5" />
                                </Link>
                                
                                {/* Cart with dropdown - UPDATED */}
                                <div className="relative">
                                    <CartIcon className="p-2 rounded-full hover:bg-black/5 animate" />
                                </div>

                                <button className="hidden sm:inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md hover:bg-black/5 transition-colors">
                                    AUD <ChevronDown className="size-4" />
                                </button>
                            </div>

                            {/* Collapsed Icons for md screens (768-1023px) */}
                            <div ref={iconMenuRef} className="lg:hidden md:flex relative">
                                <button
                                    onClick={() => setIconMenuOpen((v) => !v)}
                                    className="p-2 rounded-md hover:bg-black/5 transition-colors"
                                    aria-label="More options"
                                >
                                    <MoreHorizontal className="size-5" />
                                </button>
                                {iconMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-44 rounded-md border border-black/10 bg-white shadow-lg py-2">
                                        <Link href="#" onClick={() => setIconMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5">
                                            <User className="size-4" /> Account
                                        </Link>
                                        <Link href="#" onClick={() => setIconMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-black/5">
                                            <Heart className="size-4" /> Wishlist
                                        </Link>
                                        
                                        {/* Cart in collapsed menu - UPDATED */}
                                        <CartIcon 
                                            onClick={() => {
                                                setCartOpen(!cartOpen);
                                                setIconMenuOpen(false);
                                            }}
                                            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-black/5"
                                            showLabel={true}
                                        />

                                        <button onClick={() => setIconMenuOpen(false)} className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-black/5">
                                            <ChevronDown className="size-4" /> Currency (AUD)
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button (<768px) */}
                            <button
                                onClick={() => {
                                    setMobileOpen((v) => !v);
                                    setIconMenuOpen(false);
                                }}
                                className="md:hidden p-2 rounded-md hover:bg-black/5 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-black/10 px-6 py-4 bg-white">
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link href="#" onClick={() => setMobileOpen(false)} className="tracking-wide text-gray-800 hover:text-black transition-colors">ALL JEWELLERY</Link></li>
                            <li><Link href="#" onClick={() => setMobileOpen(false)} className="tracking-wide text-gray-800 hover:text-black transition-colors">NEW ARRIVALS</Link></li>
                            <li><Link href="#" onClick={() => setMobileOpen(false)} className="tracking-wide text-gray-800 hover:text-black transition-colors">BEST SELLERS</Link></li>
                            <li><Link href="#" onClick={() => setMobileOpen(false)} className="tracking-wide text-gray-800 hover:text-black transition-colors">ON SALE</Link></li>
                            
                            <li className="border-t border-black/10 pt-4 mt-2">
                                <Link href="#" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-1 py-2 text-sm hover:bg-black/5 rounded-md">
                                    <User className="size-4" /> Account
                                </Link>
                                <Link href="#" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-1 py-2 text-sm hover:bg-black/5 rounded-md">
                                    <Heart className="size-4" /> Wishlist
                                </Link>
                                
                                {/* Cart in mobile menu - UPDATED */}
                                <CartIcon 
                                    onClick={() => {
                                        setCartOpen(!cartOpen);
                                        setMobileOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2 px-1 py-2 text-sm hover:bg-black/5 rounded-md"
                                    showLabel={true}
                                />

                                <button onClick={() => setMobileOpen(false)} className="flex w-full items-center gap-2 px-1 py-2 text-sm hover:bg-black/5 rounded-md">
                                    <ChevronDown className="size-4" /> Currency (AUD)
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}