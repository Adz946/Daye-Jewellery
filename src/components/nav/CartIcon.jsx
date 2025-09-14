import { useState, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';

import { NavLink } from './NavLink';
import { CartDropdown } from './CartDropdown';
import { useCart } from '@/contexts/CartContext';

export function CartIcon({ size = 24, onClick = null, classes = "" }) {
    const { getCartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);
    const count = getCartCount();

    return (
        <div className="relative">            
            <NavLink link="#" onClick={onClick || (() => setIsOpen(!isOpen))} ref={triggerRef} classes={classes}> 
                <ShoppingBag size={size} className="animate hover:text-blue" /> 

                {count > 0 && (
                    <span className="absolute -top-3 -right-2 bg-red text-white text-xs font-bold rounded-full p-1 
                        flex items-center justify-center min-w-[20px]"> {count > 99 ? '99+' : count} </span>
                )}
            </NavLink>

            {onClick ? <></> : <CartDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} />}
        </div>
    );
}