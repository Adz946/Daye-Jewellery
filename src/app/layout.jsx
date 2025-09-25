import { Montserrat, Sofia_Sans } from "next/font/google";
import "../styles/globals.css";

import { Suspense } from "react";
import { UIProvider } from "@/contexts/UIProvider";
import { AppProvider } from "@/contexts/AppProvider";
import { GlobalModal } from "@/components/GlobalModal";
import NavController from "@/components/nav/NavController";
import { ToastContainer } from '@/components/ToastContainer';

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
				<Suspense fallback={
					<div className="w-full h-full flex items-center justify-center text-center text-bold">
						<h1 className="text-3xl">Loading Content....</h1>
						<p className="text-lg">Please Be Patient</p>
					</div>
				}>
					<AppProvider>
						<UIProvider>
							<NavController />
							{children}
							<GlobalModal />
							<ToastContainer /> 
						</UIProvider>
					</AppProvider>
				</Suspense>
			</body>
		</html>
	);
}
