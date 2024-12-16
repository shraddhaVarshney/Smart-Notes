import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Smart Notes Mini Project",
  description: "Developed by Shraddha Varshney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} flex flex-col h-screen bg-neutral-200 ${geistMono.variable} antialiased`}
      >
        <CookiesProvider>
          <div className="w-full h-screen flex flex-col px-5">
            <Navbar />
            <div className="w-full flex h-screen justify-center items-center">
              {children}
            </div>
          </div>
          <Toaster />
        </CookiesProvider>
      </body>
    </html >
  );
}
