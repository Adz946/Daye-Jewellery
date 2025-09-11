import { Trash2 } from "lucide-react";

export function CartItem({ item, onClick = null }) {
    return (
        <div className="p-4 border-b border-dark/10">
            <h4 className="font-medium text-sm text-dark pb-2">{item.desc}</h4>

            <div className="flex gap-2">
                <div className="flex-1">
                    <div className="flex gap-4 text-xs text-dark/70">
                        <p>Size: {item.size}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                    
                    <p className="font-bold text-sm pt-1"> ${(item.price * item.quantity).toFixed(2)} </p>
                </div>

                <button onClick={onClick} className="text-dark hover:text-red" aria-label="Remove item"> 
                    <Trash2 size={20} /> </button>
            </div>
        </div>
    );
}