"use client";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Scroller } from "@/components/Scroller";
import { ShopItem } from "@/components/ShopItem";
import { DisplayItem } from "@/components/DisplayItem";
import NavbarPrimary from "@/components/nav/NavbarPrimary";

export default function Home() {
    return (
        <main>
            {/** NAV */}
            <NavbarPrimary />
            {/* HEAD */}
            <section className="stacked h-full text-light font-main">
                <div className="relative aspect-[12/10] md:aspect-auto md:h-screen">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    >
                        <source src="/HERO.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="w-full h-full z-50 gap-5 p-15 bg-black/20 flex flex-col text-center items-center justify-end">
                    <div className="flex flex-col gap-2 text-2xl font-bold">
                        <p>NEW ARRIVALS</p>
                        <p>NOW AVAILABLE</p>
                    </div>
                    <Button text={"SHOP NOW"} />
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

                <div className="w-full p-4 gap-8 grid grid-cols-1 lg:grid-cols-2">
                    <DisplayItem title="COLLECTION" text="Shop By Collection" />
                    <DisplayItem title="BEST" text="Shop By Best Sellers" />
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
                        Handcrafted, everyday pieces designed for effortless
                        style. Unique, modern, and made to last — find jewellery
                        that tells your story. <br />
                        Ready to elevate your look?
                    </p>
                    <Button text={"SHOP NOW"} />
                </div>
            </section>

            <section className="section p-5">
                <Scroller title="Trending Now">
                    <ShopItem desc="Gold Chain Necklace" price="1,249" />
                    <ShopItem desc="Silver Bracelet" price="199" />
                    <ShopItem desc="Diamond Ring" price="2,499" />
                    <ShopItem desc="Pearl Earrings" price="899" />
                    <ShopItem desc="Ruby Pendant" price="1,599" />
                    <ShopItem desc="Emerald Necklace" price="2,299" />
                </Scroller>
            </section>
        </main>
    );
}
