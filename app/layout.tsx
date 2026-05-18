import { Metadata } from "next";
import { Manrope } from "next/font/google";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Looking for car,booking",
  openGraph: {
    title: "RentalCar",
    description:
      "Here you will able to pick car you want to rent or just look at the list of available cars",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
