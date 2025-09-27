import { Copyright } from "lucide-react";

export default function Footer() {
    return (
        <div className="w-full mt-8 px-6 py-2 flex flex-col items-center justify-center text-center bg-black text-light
            lg:flex-row lg:text-left lg:justify-between">
            <div className="p-2 flex flex-col gap-1">
                <h2 className="text-2xl text-bold font-title">DAYE JEWELLERY</h2>
                <div className="flex gap-2 items-center">
                    <Copyright size={14} />
                    <p>2025, All Rights Reserved.</p>
                </div>
            </div>

            <div className="p-2 flex gap-4">
                <p>Facebok</p>
                <p>Insta</p>
            </div>
        </div>
    );
}