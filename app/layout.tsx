import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransitionHandler } from "@/components/layout/PageTransitionHandler";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ถังขยะรักโลก : DIY",
  description: "เว็บไซต์สำหรับไอเดีย DIY ถังขยะรักโลก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <PageTransitionHandler />
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="main-transition flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
