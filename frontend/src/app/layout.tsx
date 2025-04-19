import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/app/components/Providers";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Script from "next/script";
import React from "react";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: '--font-inter',
});

export const metadata = {
    title: "Paradise Store - Магазин верхнього одягу",
    description: "Інтернет-магазин верхнього одягу Paradise Store",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk">
        <body className={`${inter.variable} font-sans`}>
        <Providers>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </Providers>
        <Script id="sticky-header" strategy="afterInteractive">
            {`
                document.addEventListener('DOMContentLoaded', function() {
                    window.addEventListener('scroll', function() {
                        const headerBottom = document.querySelector('.header-bottom');
                        if (!headerBottom) return;
                        
                        const headerPos = headerBottom.getBoundingClientRect().top;
                        
                        if (headerPos <= 0 && !headerBottom.classList.contains('fixed')) {
                            document.body.style.paddingTop = '62px'; // Height of the header-bottom
                            headerBottom.classList.add('fixed');
                        } else if (headerPos > 0 && headerBottom.classList.contains('fixed')) {
                            headerBottom.classList.remove('fixed');
                            document.body.style.paddingTop = '0';
                        }
                    });
                });
                `}
        </Script>
        </body>
        </html>
    );
}