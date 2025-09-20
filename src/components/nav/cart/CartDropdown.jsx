import { useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

import { CartContent } from './CartContent';
import { useCart } from '@/contexts/CartContext';

export function CartDropdown({ isOpen, onClose, triggerRef }) {
    const { cartCount } = useCart();
    const dropdownRef = useRef(null);

    const handleClickOutside = useCallback((e) => {
        if (dropdownRef.current && 
            !dropdownRef.current.contains(e.target) &&
            triggerRef.current && 
            !triggerRef.current.contains(e.target)) {
            onClose();
        }
    }, [onClose]);

    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleClickOutside, handleEscape]);

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute right-0 top-10 w-80 bg-white border 
            border-dark/10 rounded-lg shadow-lg z-500">
            
            <div className="h-16 flex justify-between items-center p-4 border-b border-dark/10">
                <h3 className="font-semibold text-dark">Shopping Cart ({cartCount})</h3>
                <button onClick={onClose} className="text-dark hover:text-red">
                    <X size={20} />
                </button>
            </div>

            <div className="h-86">
                <CartContent className="h-full p-4" />
            </div>
        </div>
    );
}