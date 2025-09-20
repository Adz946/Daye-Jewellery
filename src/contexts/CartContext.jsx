"use client"; 
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { createStorageManager } from '@/utils/Storage';

const CartContext = createContext();
const cartStorage = createStorageManager('jewelry_cart', 'sessionStorage');

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);

    const cartCount = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);
    }, [cart]);

    // Load from sessionStorage on mount
    useEffect(() => {
        setIsHydrated(true);
        const savedCart = cartStorage.get();
        setCart(savedCart);
    }, []);

    const addToCart = useCallback((itemId, desc, price, size, quantity = 1) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.itemId === itemId && item.size === size
            );

            let newCart;

            if (existingItemIndex >= 0) {
                newCart = prevCart.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newCart = [...prevCart, { 
                    itemId, desc, price, size, quantity, addedAt: Date.now()
                }];
            }

            cartStorage.set(newCart);
            return newCart;
        });
    }, []);

    const removeFromCart = useCallback((itemId, size) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(
                item => !(item.itemId === itemId && item.size === size)
            );
            cartStorage.set(newCart);
            return newCart;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
        cartStorage.clear();
    }, []);

    const updateQuantity = useCallback((itemId, size, newQuantity) => {
        const quantity = Math.max(0, Math.floor(Number(newQuantity) || 0));
        
        setCart(prevCart => {
            if (quantity === 0) {
                const newCart = prevCart.filter(
                    item => !(item.itemId === itemId && item.size === size)
                );
                cartStorage.set(newCart);
                return newCart;
            }
            
            const newCart = prevCart.map(item => 
                (item.itemId === itemId && item.size === size)
                    ? { ...item, quantity }
                    : item
            );
            
            cartStorage.set(newCart);
            return newCart;
        });
    }, []);

    const value = useMemo(() => ({
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart]);

    // Prevent hydration mismatch
    if (!isHydrated) return <div style={{display: 'none'}}>{children}</div>;

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}