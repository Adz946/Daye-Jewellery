import Image from "next/image";
import { Heart, ShoppingBag } from 'lucide-react';

function getImg(type) {
    switch(type) {
        case 'N':
            return "NECKLACE";
        case 'B':
            return 'BRACELET';
        case 'R':
            return 'RING';
        case 'E':
            return 'EARRING';
        default:
            return 'ITEM';
    }
}

export function ShopItem({desc, price, salePrice = null, type = ""}) {
    const isOnSale = salePrice !== null && salePrice !== undefined;

    return (
        <div className="flex flex-col text-center text-dark animate hover:scale-95">
            <div className="relative w-full aspect-square bg-light shadow-lg rounded-lg">
                <Image src={`/${getImg(type)}_PLACEHOLDER.png`} fill className="object-contain"
                    alt="A placeholder, representing a 'Shop Item'" />

                <div className="p-5 absolute top-0 right-0">
                    <Heart size={24} className="text-dark hover:fill-dark" />
                </div>
            </div>
                
            <div className="w-full h-30 flex text-center items-center justify-center">
                <p className="px-4 py-2 text-sm font-main">{desc}</p>
            </div>

            <div className="w-full h-15 flex flex-row border-b-2 border-dark">
                <div className="w-3/4 text-2xl flex text-center items-center justify-center">
                    {isOnSale ? (
                        <div className="w-full flex flex-col">
                            <p className="text-sm opacity-75 line-through">${price}</p>
                            <p className="text-2xl font-bold">${salePrice}</p>
                        </div>
                    ) : ( <p className="text-2xl">${price}</p> )}
                </div>
                

                <div className="w-1/4 text-light bg-dark flex text-center items-center justify-center
                    hover:my-1 hover:bg-white hover:text-dark hover:border-2 hover:border-dark hover:rounded-full">
                    <ShoppingBag size={24} />
                </div>
            </div>
        </div>
    );
}