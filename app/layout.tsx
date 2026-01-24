import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PageTransitionHandler } from "@/components/layout/PageTransitionHandler";
import { ViewTransitionMain } from "@/components/layout/ViewTransitionMain";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ถังขยะรักโลก : DIY",
  description: "Project for PBL",
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
          <main className="flex-1">
            <ViewTransitionMain>{children}</ViewTransitionMain>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
