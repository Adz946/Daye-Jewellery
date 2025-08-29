import Image from "next/image";
import { Button } from "@/components/Button";
import { DisplayItem } from "@/components/DisplayItem";

export default function Home() {
    return (
		<main>
			{/* HEAD */}
			<section className="stacked h-full text-light font-main">
				<div className="relative aspect-[12/10] md:aspect-auto md:h-screen">
					<Image fill priority src={"/HERO.png"} alt="HERO - A few images of Jewellery being worn."
						className="object-cover object-center" />
				</div>

				<div className="w-full h-full z-50 gap-5 p-15 bg-black/50 flex flex-col text-center items-center justify-end">
					<div className="flex flex-col gap-2 text-2xl font-bold">
						<p>NEW ARRIVALS</p>
						<p>NOW AVAILABLE</p>
					</div>
					<Button text={"SHOP NOW"} />
				</div>
			</section>

			{/* TYPE SELECT */}
			<section className="section shadow-inner shadow-dark">
				<div className="w-full p-4 gap-2 grid grid-cols-2 lg:grid-cols-4">
					<DisplayItem title="NECKLACE" text="Necklaces" />
					<DisplayItem title="BRACELET" text="Bracelets" />
					<DisplayItem title="RING" text="Rings" />
					<DisplayItem title="EARRING" text="Earrings" />
				</div>

				<div className="w-full p-4 gap-2 grid grid-cols-1 lg:grid-cols-2">
					<DisplayItem title="COLLECTION" text="Shop By Collection" />
					<DisplayItem title="BEST" text="Shop By Best Sellers" />
				</div>
			</section>
		</main>
    );
}
