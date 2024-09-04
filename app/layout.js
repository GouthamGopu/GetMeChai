import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SessionWrapper from "@/app/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me Chai - Your Funding App",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
        <div className="relative bg-black text-white">
          {/* Grid Background */}
          <div className="fixed top-0 inset-0 bg-[linear-gradient(to_right,#4f4f4f80_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f80_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none h-screen"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <Navbar />
            <div className="">
              {children}
            </div>
            <Footer />
          </div>
        </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
