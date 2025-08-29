import Image from "next/image";

export function DisplayItem({title, text}) {
    return (
        <div className="flex flex-col text-center bg-light text-dark hover:bg-dark hover:text-light">
            <div className="relative w-full aspect-square bg-white shadow-inner-custom">
                <Image src={`/${title}_PLACEHOLDER.png`} fill className="object-contain"
                    alt="Image representing one of the many link items in the grid" />
            </div>
                
            <p className="w-full py-2 font-main">{text}</p>
        </div>
    );
}