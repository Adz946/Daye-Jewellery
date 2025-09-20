import { Montserrat, Sofia_Sans } from "next/font/google";
import "../styles/globals.css";

import { CartProvider } from "@/contexts/CartContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import NavController from "@/components/nav/NavController";

const montserrat = Montserrat({
	variable: "--font-montserrat", subsets: ["latin"]
});

const sofiaSans = Sofia_Sans({
  	variable: "--font-sofia-sans", subsets: ["latin"]
});

export const metadata = {
	title: "Daye Jewellery",
	description: "Handcrafted, everyday pieces designed for effortless style. Unique, modern, and made to last — find jewellery that tells your story."
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} ${sofiaSans.variable} antialiased`}>
				<CartProvider>
					<FilterProvider>
						<WishlistProvider>
							<NavController />
							{children}
						</WishlistProvider>
					</FilterProvider>
				</CartProvider>
			</body>
		</html>
	);
}
