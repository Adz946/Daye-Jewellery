import { ShoppingBag } from "lucide-react";
import { CartItem } from "./CartItem";
import { Button } from "../Button";
import { useCart } from '@/contexts/CartContext';

export function CartContent({ showTitle = false, className = "" }) {
    const { cart, removeFromCart, getCartCount } = useCart();
    
    const totalPrice = cart.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.quantity);
    }, 0);

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
                    <h2 className="text-xl font-semibold">Shopping Cart ({getCartCount()})</h2>
                </div>
            )}
            
            <div className="flex-1 overflow-y-auto py-2">
                {cart.map((cartItem, index) => (
                    <CartItem key={`${cartItem.itemId}-${cartItem.size}-${index}`} item={cartItem}
                        onClick={() => removeFromCart(cartItem.itemId, cartItem.size)} />
                ))}
            </div>
            
            <div className="pt-4 space-y-4">
                <p className="text-center">
                    Total: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </p>
                <Button text="Checkout" className="w-full" />
            </div>
        </div>
    );
}