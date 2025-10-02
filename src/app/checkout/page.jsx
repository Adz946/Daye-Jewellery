'use client';
import { useState } from "react";

import { Button } from "@/components/Button";
import { useCart } from "@/contexts/AppProvider";
import ReviewItem from "@/components/checkout/ReviewItem";
import ShippingDetails from "@/components/checkout/ShippingDetails";

export default function Checkout() {
    const { cart, cartTotal } = useCart();
    console.log("Checkout page rendered, cart:", cart);

    const [note, setNote] = useState("");
    const [selectedAddress, setSelectedAddress] = useState(null);

    return (
        <section className="max-w-3xl mx-auto py-10 px-4">
            <div className="mb-8 border-b-2 border-dark">
                  <h1 className="text-3xl font-bold py-4 text-center">Checkout</h1>  
            </div>

            {/* Cart Review */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Review Your Items</h2>
                
                <div className="gap-4 bg-white flex flex-col rounded-lg shadow divide-y">
                    {cart.length === 0 ? ( <div className="p-8 text-center text-gray-500">Your cart is empty.</div> ) : 
                        ( cart.map(item => ( <ReviewItem key={`${item.itemId}-${item.size}`} item={item} /> )) )}
                </div>
            </section>

            {/* Total */}
            <section className="mb-8 flex justify-end">
                <div className="text-lg font-semibold">
                    Total: <span className="text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
            </section>

            <ShippingDetails value={selectedAddress} onChange={setSelectedAddress} />

            {/* Optional: Order Note */}
            <section className="mb-8">
                <label className="block text-sm font-medium mb-2">Order Note (optional)</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Any special instructions?"
                    className="w-full border rounded px-3 py-2" rows={2} />
            </section>

            {/* Actions */}
            <section className="flex flex-col sm:flex-row gap-4">
                <Button text="Continue Shopping" onClick={() => window.location.href = "/shop"} />
                <Button text="Proceed to Payment" disabled={cart.length === 0} onClick={() => alert("Proceeding to payment...")} />
            </section>
        </section>
    );
}