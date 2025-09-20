import { memo } from "react";
import { Heart } from "lucide-react";
import { WishlistItem } from "./WishlistItem";
import { Button } from "@/components/Button";
import { useWishlist } from '@/contexts/WishlistContext';

export const WishlistContent = memo(function WishlistContent({ showTitle = false, className = "" }) {
    const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
                <Heart size={48} className="text-dark/70 mb-4" />
                <p className="text-dark/70">Your wishlist is empty</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {showTitle && (
                <div className="pb-4 border-b border-dark/10">
                    <h2 className="text-xl font-semibold">Wishlist ({wishlistCount})</h2>
                </div>
            )}
            
            <div className="flex-1 overflow-y-auto py-2">
                {wishlist.map((wishlistItem, index) => (
                    <WishlistItem 
                        key={`${wishlistItem.itemId}-${index}`} 
                        item={wishlistItem}
                        onRemove={() => removeFromWishlist(wishlistItem.itemId)} 
                    />
                ))}
            </div>
            
            <div className="pt-4">
                <Button text="View All" className="w-full" />
            </div>
        </div>
    );
});