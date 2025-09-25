import { Montserrat, Sofia_Sans } from "next/font/google";
import "../styles/globals.css";

import { ToastContainer } from '@/components/ToastContainer';
import NavController from "@/components/nav/NavController";
import { GlobalModal } from "@/components/GlobalModal";
import { AppProvider } from "@/contexts/AppProvider";
import { UIProvider } from "@/contexts/UIProvider";

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
				<AppProvider>
					<UIProvider>
						<NavController />
						{children}
						<GlobalModal />
						<ToastContainer /> 
					</UIProvider>
				</AppProvider>
			</body>
		</html>
	);
}
