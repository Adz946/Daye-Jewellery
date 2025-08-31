import Image from "next/image";
import { Heart, ShoppingBag } from 'lucide-react';

export function ShopItem({desc, price}) {
    return (
        <div className="flex flex-col text-center text-dark animate hover:scale-95">
            <div className="relative w-full aspect-square bg-light shadow-lg rounded-lg">
                <Image src={`/ITEM_PLACEHOLDER.png`} fill className="object-contain"
                    alt="A placeholder, representing a 'Shop Item'" />

                <div className="p-5 absolute top-0 right-0">
                    <Heart size={24} className="text-dark hover:fill-dark" />
                </div>
            </div>
                
            <div className="w-full h-30 flex text-center items-center justify-center">
                <p className="px-8 py-2 font-main">{desc}</p>
            </div>

            <div className="w-full h-15 flex flex-row border-b-2 border-dark">
                <div className="w-3/4 text-2xl flex text-center items-center justify-center">
                    <p>${price}</p>
                </div>
                

                <div className="w-1/4 text-light bg-dark flex text-center items-center justify-center
                    hover:bg-white hover:text-dark">
                    <ShoppingBag size={24} />
                </div>
            </div>
        </div>
    );
}