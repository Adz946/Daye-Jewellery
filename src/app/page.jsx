"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/Button";
import { DisplayItem } from "@/components/DisplayItem";
import { SelectionScroller } from "@/components/home/selectionScroller";

export default function Home() {
    const router = useRouter(); 
    const toShopNow = () => { router.push('/shop'); };

    return (
        <main>
            {/* HEAD */}
            <section className="stacked h-full text-light font-main">
                <div className="relative aspect-[12/10] md:aspect-auto md:h-screen">
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
                        <source src="/HERO.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="w-full h-full z-50 gap-5 p-15 bg-black/20 flex flex-col text-center items-center justify-end">
                    <div className="flex flex-col gap-2 font-bold">
                        <p className="text-xl">NEW ARRIVALS</p>
                        <p className="text-2xl">NOW AVAILABLE</p>
                    </div>
                    <Button wd="lg:w-1/3" text={"SHOP NOW"} onClick={toShopNow} />
                </div>
            </section>

            {/* TYPE SELECT */}
            <section className="section p-5">
                <div className="w-full p-4 gap-4 grid grid-cols-2 lg:grid-cols-4">
                    <DisplayItem title="NECKLACE" text="Necklaces" />
                    <DisplayItem title="BRACELET" text="Bracelets" />
                    <DisplayItem title="RING" text="Rings" />
                    <DisplayItem title="EARRING" text="Earrings" />
                </div>

                <div className="w-full p-4 gap-8 grid grid-cols-1 lg:grid-cols-3">
                    <DisplayItem title="COLLECTION" text="Shop By Collection" />
                    <DisplayItem title="BEST" text="Shop By Best Sellers" />
                    <DisplayItem title="ITEM" text="Shop By... Other?" />
                </div>
            </section>

            {/* MESSAGE */}
            <section className="w-full p-5 flex">
                <div className="relative w-1/3 aspect-square">
                    <Image
                        src={`/MESSAGE.png`}
                        fill
                        className="object-contain"
                        alt="Image representing one of the many link items in the grid"
                    />
                </div>

                <div className="w-2/3 gap-5 px-10 flex flex-col text-left justify-center">
                    <div className="w-full border-b-2 border-dark">
                        <h2 className="text-2xl text-dark font-title">
                            Discover With Daye
                        </h2>
                    </div>
                    <p className="text-dark font-main">
                        Handcrafted, everyday pieces designed for effortless style. Unique, modern, and made to last — 
                        find jewellery that tells your story. <br/><br/> Ready to elevate your look?
                    </p>
                    <Button wd="lg:w-1/3" text={"SHOP NOW"} onClick={toShopNow} />
                </div>
            </section>

            <SelectionScroller title="BEST SELLERS" />
        </main>
    );
}
