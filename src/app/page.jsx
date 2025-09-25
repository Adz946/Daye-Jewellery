"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useFilters } from "@/contexts/FilterContext";
import { DisplayItem } from "@/components/DisplayItem";
import { SelectionScroller } from "@/components/home/selectionScroller";
import Reviews from "@/components/home/Reviews";
import { ChevronRight } from "lucide-react";

export default function Home() {
    const router = useRouter();
    const toShopNow = () => {
        router.push("/shop");
    };

    const { presetFilters } = useFilters();

    return (
        <main>
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
                    <div className="flex flex-col gap-2 font-bold">
                        <p className="text-xl">NEW ARRIVALS</p>
                        <p className="text-2xl">NOW AVAILABLE</p>
                    </div>
                    <Button
                        wd="lg:w-1/3"
                        text={"SHOP NOW"}
                        onClick={toShopNow}
                    />
                </div>
            </section>

            {/* TYPE SELECT */}
            <section className="w-full p-4 lg:p-12 md:p-6 flex flex-col gap-4 md:gap-8">
                <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    <DisplayItem
                        title="NECKLACE"
                        text="Necklaces"
                        onClick={presetFilters.filterNecklaces}
                    />
                    <DisplayItem
                        title="BRACELET"
                        text="Bracelets"
                        onClick={presetFilters.filterBracelets}
                    />
                    <DisplayItem
                        title="RING"
                        text="Rings"
                        onClick={presetFilters.filterRings}
                    />
                    <DisplayItem
                        title="EARRING"
                        text="Earrings"
                        onClick={presetFilters.filterEarrings}
                    />
                </div>
            </section>

            <section className="w-full p-4 lg:p-12 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative w-full md:w-1/3 aspect-square">
                    <Image
                        src={`/MESSAGE.png`}
                        fill
                        className="object-contain"
                        alt="Handcrafted jewellery from Discover With Daye"
                    />
                </div>

                <div className="w-full md:w-2/3 flex flex-col items-center text-center md:items-start md:text-left gap-5 md:px-10">
                    <div className="w-full border-b-2 border-dark">
                        <h2 className="text-xl md:text-2xl text-dark font-title pb-2">
                            Discover With Daye
                        </h2>
                    </div>
                    <p className="text-dark font-main text-base md:text-lg leading-relaxed">
                        Handcrafted, everyday pieces designed for effortless
                        style. Unique, modern, and made to last — find jewellery
                        that tells your story.
                        <br />
                        <br />
                        Ready to elevate your look?
                    </p>
                    <Button
                        wd="lg:w-1/3"
                        text={"SHOP NOW"}
                        onClick={toShopNow}
                    />
                </div>
            </section>

            <SelectionScroller title="BEST SELLERS" />

            <section className="relative aspect-[12/10] w-full md:aspect-auto md:h-screen">
                <picture>
                    <source
                        media="(max-width: 768px)"
                        srcSet="/UNIQUE_PLACEHOLDER_MOBILE.jpg"
                    />
                    <img
                        src="/UNIQUE_PLACEHOLDER.jpg"
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </picture>

                <div className="absolute inset-0 flex items-end md:items-center md:justify-end p-6 md:p-30">
                    <div className="bg-white/80 md:bg-transparent rounded-xl p-4 md:p-0 w-full md:w-1/3 text-center md:text-left">
                        <h3 className="font-main font-bold text-xl">
                            The Ultimate Symbol Of Power
                        </h3>
                        <p className="font-main mt-2">
                            Forged in fire. Enduring in form. An engagement ring
                            that commands presence beyond time.
                        </p>
                        <a
                            href="#"
                            className="font-main font-semibold mt-4 flex items-center justify-center md:justify-start"
                        >
                            Discover More <ChevronRight />
                        </a>
                    </div>
                </div>
            </section>

            <Reviews />
        </main>
    );
}
