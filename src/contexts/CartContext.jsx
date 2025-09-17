"use client"; 
import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';

const CartContext = createContext();
const CART_KEY = 'jewelry_cart';

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const saveTimeoutRef = useRef(null);

    const cartCount = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity);
        }, 0);
    }, [cart]);

    const debouncedSave = useCallback((cartData) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        
        saveTimeoutRef.current = setTimeout(() => {
            sessionStorage.setItem(CART_KEY, JSON.stringify(cartData));
        }, 300);
    }, []);

    useEffect(() => {
        const savedCart = sessionStorage.getItem(CART_KEY);
        if (savedCart) {
            try { 
                setCart(JSON.parse(savedCart)); 
            } catch (error) {
                console.error('Error Loading Cart:', error);
                setCart([]);
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
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

            debouncedSave(newCart);
            return newCart;
        });
    }, [debouncedSave]);

    const removeFromCart = useCallback((itemId, size) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(
                item => !(item.itemId === itemId && item.size === size)
            );
            debouncedSave(newCart);
            return newCart;
        });
    }, [debouncedSave]);

    const clearCart = useCallback(() => {
        setCart([]);
        sessionStorage.removeItem(CART_KEY);
    }, []);

    const updateQuantity = useCallback((itemId, size, newQuantity) => {
        const quantity = Math.max(0, Math.floor(Number(newQuantity) || 0));
        
        setCart(prevCart => {
            if (quantity === 0) {
                const newCart = prevCart.filter(
                    item => !(item.itemId === itemId && item.size === size)
                );
                debouncedSave(newCart);
                return newCart;
            }
            
            const newCart = prevCart.map(item => 
                (item.itemId === itemId && item.size === size)
                    ? { ...item, quantity }
                    : item
            );
            
            debouncedSave(newCart);
            return newCart;
        });
    }, [debouncedSave]);

    const value = useMemo(() => ({
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart]);

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