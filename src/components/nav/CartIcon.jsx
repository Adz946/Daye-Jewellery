import { useState, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartDropdown } from './CartDropdown';
import { useCart } from '@/contexts/CartContext';

export function CartIcon({ className = "", showLabel = false }) {
    const { getCartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const count = getCartCount();

    return (
        <div className="relative">
            <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}  className={`relative ${className}`} 
                aria-label={`Cart (${count} items)`}>
                <ShoppingBag className="size-5" />

                {count > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red text-light text-xs font-bold rounded-full p-1 
                        flex items-center justify-center min-w-[20px]">
                        {count > 99 ? '99+' : count}
                    </span>
                )}
                {showLabel && <span className="ml-2">Cart</span>}
            </button>
            
            <CartDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} />
        </div>
    );
}