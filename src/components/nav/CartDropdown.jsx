// components/CartDropdown.jsx (Updated)
import { useRef, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

import { Button } from '../Button';
import { CartItem } from './CartItem';
import { useCart } from '@/contexts/CartContext';

export function CartDropdown({ isOpen, onClose, triggerRef }) {
    const { cart, removeFromCart, getCartCount } = useCart();
    const dropdownRef = useRef(null);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(e.target) &&
                triggerRef.current && 
                !triggerRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const totalPrice = cart.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.quantity);
    }, 0);

    return (
        <div ref={dropdownRef} className="absolute right-0 top-12 w-80 bg-white border 
            border-dark/10 rounded-lg shadow-lg z-50">
            {/* Header */}
            <div className="h-16 flex justify-between items-center p-4 border-b border-dark/10">
                <h3 className="font-semibold text-dark">Shopping Cart ({getCartCount()})</h3>
                <button onClick={onClose} className="text-dark hover:text-red">
                    <X size={20} />
                </button>
            </div>

            {cart.length === 0 ? (
                /* Empty Cart */
                <div className="p-8 text-center">
                    <ShoppingBag size={48} className="mx-auto text-dark/70 mb-3" />
                    <p className="text-dark/70">Your cart is empty</p>
                </div>
            ) : (
                <div className='h-86 overflow-y-auto'>
                    {/* Cart Items */}
                    <div className="py-2">
                        {cart.map((cartItem, index) => (
                            <CartItem key={`${cartItem.itemId}-${cartItem.size}-${index}`} item={cartItem}
                                onClick={() => removeFromCart(cartItem.itemId, cartItem.size)} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-4 p-4 items-center">
                        <p>Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span></p>
                        <Button text="Checkout" className="w-3/4" />
                    </div>
                </div>
            )}
        </div>
    );
}