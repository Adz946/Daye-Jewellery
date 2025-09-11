"use client"; 
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const CART_KEY = 'jewelry_cart';

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = sessionStorage.getItem(CART_KEY);
        if (savedCart) {
            try { setCart(JSON.parse(savedCart)); } 
            catch (error) {
                console.error('Error Loading Cart:', error);
                setCart([]);
            }
        }
    }, []);

    const addToCart = (itemId, desc, price, size, quantity = 1) => {
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
                    itemId, desc,  price, size, quantity, addedAt: new Date().toISOString()
                }];
            }

            sessionStorage.setItem(CART_KEY, JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (itemId, size) => {
        setCart(prevCart => {
            const newCart = prevCart.filter(
                item => !(item.itemId === itemId && item.size === size)
            );
            sessionStorage.setItem(CART_KEY, JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        sessionStorage.removeItem(CART_KEY);
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount
    };

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