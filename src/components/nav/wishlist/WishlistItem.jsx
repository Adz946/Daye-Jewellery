import { memo } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export const WishlistItem = memo(function WishlistItem({ item, onRemove = null }) {
    const { addToCart } = useCart();
    const { removeFromWishlist } = useWishlist();

    const handleMoveToCart = () => {
        addToCart(item.itemId, item.desc, item.price, 'default', 1);
        removeFromWishlist(item.itemId);
    };

    return (
        <div className="p-4 border-b border-dark/10">
            <h4 className="font-medium text-sm text-dark pb-2">{item.desc}</h4>

            <div className="flex gap-2 items-center">
                <div className="flex-1">
                    <p className="font-bold text-sm">${item.price}</p>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={handleMoveToCart} 
                        className="text-dark hover:text-blue" 
                        aria-label="Move to cart"
                        title="Move to cart"
                    > 
                        <ShoppingBag size={18} /> 
                    </button>
                    
                    <button 
                        onClick={onRemove} 
                        className="text-dark hover:text-red" 
                        aria-label="Remove item"
                    > 
                        <Trash2 size={18} /> 
                    </button>
                </div>
            </div>
        </div>
    );
});