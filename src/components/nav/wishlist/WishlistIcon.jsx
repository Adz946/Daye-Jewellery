import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

import { NavLink } from '../NavLink';
import { WishlistDropdown } from './WishlistDropdown';
import { useWishlist } from '@/contexts/WishlistContext';

export function WishlistIcon({ size = 24, onClick = null, classes = "" }) {
    const { wishlistCount } = useWishlist();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    return (
        <div className="relative">            
            <NavLink link="#" onClick={onClick || (() => setIsOpen(!isOpen))} ref={triggerRef} classes={classes}> 
                <Heart size={size} className="animate hover:text-blue" /> 

                {wishlistCount > 0 && (
                    <span className="absolute -top-3 -right-2 bg-red text-white text-xs font-bold rounded-full p-1 
                        flex items-center justify-center min-w-[20px]"> 
                        {wishlistCount > 99 ? '99+' : wishlistCount} 
                    </span>
                )}
            </NavLink>

            {onClick ? <></> : <WishlistDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef} />}
        </div>
    );
}