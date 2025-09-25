import { memo } from "react";
import { ShoppingBag } from "lucide-react";

import { CartItem } from "./CartItem";
import { Button } from "@/components/Button";
import { useCart } from "@/contexts/AppProvider";

export const CartContent = memo(function CartContent({ showTitle = false, className = "" }) {
    const { cart, removeFromCart, cartCount, cartTotal, updateQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
                <ShoppingBag size={48} className="text-dark/70 mb-4" />
                <p className="text-dark/70">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {showTitle && (
                <div className="pb-4 border-b border-dark/10">
                    <h2 className="text-xl font-semibold">Shopping Cart ({cartCount})</h2>
                </div>
            )}
            
            <div className="flex-1 overflow-y-auto py-2">
                {cart.map((cartItem, index) => (
                    <CartItem 
                        key={`${cartItem.itemId}-${cartItem.size}-${index}`} 
                        item={cartItem}
                        onRemove={() => removeFromCart(cartItem.itemId, cartItem.size)}
                        onUpdateQuantity={(newQuantity) => updateQuantity(cartItem.itemId, cartItem.size, newQuantity)}
                    />
                ))}
            </div>
            
            <div className="pt-4 space-y-4">
                <p className="text-center">
                    Total: <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </p>
                <Button text="Checkout" className="w-full" />
            </div>
        </div>
    );
});