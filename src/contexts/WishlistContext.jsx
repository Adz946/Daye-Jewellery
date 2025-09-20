"use client"; 
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { createStorageManager } from '@/utils/Storage';

const WishlistContext = createContext();
const wishlistStorage = createStorageManager('jewelry_wishlist', 'localStorage');

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);

    const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

    // Load from localStorage on mount
    useEffect(() => {
        setIsHydrated(true);
        const savedWishlist = wishlistStorage.get();
        setWishlist(savedWishlist);
    }, []);

    // Cross-tab synchronization for localStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'jewelry_wishlist' && e.storageArea === localStorage) {
                try {
                    setWishlist(JSON.parse(e.newValue || '[]'));
                } catch { 
                    setWishlist([]); 
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToWishlist = useCallback((itemId, desc, price, image = null) => {
        setWishlist(prevWishlist => {
            const exists = prevWishlist.some(item => item.itemId === itemId);
            if (exists) return prevWishlist; // Don't add duplicates

            const newWishlist = [...prevWishlist, { 
                itemId, desc, price, image, addedAt: Date.now()
            }];
            
            wishlistStorage.set(newWishlist);
            return newWishlist;
        });
    }, []);

    const removeFromWishlist = useCallback((itemId) => {
        setWishlist(prevWishlist => {
            const newWishlist = prevWishlist.filter(item => item.itemId !== itemId);
            wishlistStorage.set(newWishlist);
            return newWishlist;
        });
    }, []);

    const isInWishlist = useCallback((itemId) => {
        return wishlist.some(item => item.itemId === itemId);
    }, [wishlist]);

    const clearWishlist = useCallback(() => {
        setWishlist([]);
        wishlistStorage.clear();
    }, []);

    const value = useMemo(() => ({
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
    }), [wishlist, wishlistCount, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist]);

    // Prevent hydration mismatch
    if (!isHydrated) return <div style={{display: 'none'}}>{children}</div>;

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
    return context;
}