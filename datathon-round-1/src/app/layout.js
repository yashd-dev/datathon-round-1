import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import {   Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const openSans = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "PolicyAnalyzer",
  description: "Analyze your policies effectively ;)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
