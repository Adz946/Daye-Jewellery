import Image from "next/image";

function getImg(type) {
    switch(type) {
        case 'N': return "NECKLACE";
        case 'B': return 'BRACELET';
        case 'R': return 'RING';
        case 'E': return 'EARRING';
        default: return 'ITEM';
    }
}

export default function ReviewItem({ item }) {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    console.log(item);

    return (
        <div className="p-4 gap-4 flex items-center">
            <div className="w-20 h-20 bg-light rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                    src={`/${getImg(item.type)}_PLACEHOLDER.png`}
                    alt={item.desc}
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <div className="flex-1">
                <div className="font-semibold">{item.desc}</div>
                <div className="text-sm text-dark/85">Size: {item.size}</div>
                <div className="text-sm text-dark/85">Qty: {item.quantity}</div>
            </div>
            <div className="text-right">
                <div className="text-lg font-bold">${itemTotal}</div>
                <div className="text-xs text-dark/85">${item.price} each</div>
            </div>
        </div>
    );
}