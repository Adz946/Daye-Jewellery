import { useState, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';

import { NavLink } from '../NavLink';
import { CartDropdown } from './CartDropdown';
import { useCart } from '@/contexts/CartContext';

export function CartIcon({ size = 24, onClick = null, classes = "" }) {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    return (
        <div className="relative">            
            <NavLink link="#" onClick={onClick || (() => setIsOpen(!isOpen))} ref={triggerRef} classes={classes}> 
                <ShoppingBag size={size} className="animate hover:text-blue" /> 

                {cartCount > 0 && (
                    <span className="absolute -top-3 -right-2 bg-red text-white text-xs font-bold rounded-full p-1 
                        flex items-center justify-center min-w-[20px]"> {cartCount > 99 ? '99+' : cartCount} </span>
                )}
            </NavLink>

            {onClick ? <></> : <CartDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} />}
        </div>
    );
}