"use client";
import { Geist_Mono, Plus_Jakarta_Sans, Geist } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from '@/lib/query-provider';
import { Toaster } from 'sonner';
import { UserProvider } from '@/context/auth-context';
import { appName } from '@/lib/utils';
import Script from 'next/script';
import { useEffect } from 'react';

const plusJarkartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jarkarta-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dynamically initialize the isosceles-widget (client-side only)
  useEffect(() => {
    const widget = document.createElement("isosceles-widget");
    widget.setAttribute("apikey", process.env.NEXT_PUBLIC_ISOSCELES_API_KEY || "52d634b1-bd60-4d22-9167-a081200a15a4");
    widget.setAttribute("hosturl", "https://app.isosceles.ai");
    document.body.appendChild(widget);

    // Cleanup to avoid memory leaks
    return () => {
      document.body.removeChild(widget);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{appName} - All in one payment solution</title>
      </head>
      <body className={`${plusJarkartaSans.variable} antialiased`}>
        <Toaster richColors />
        <UserProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </UserProvider>

        {/* Load external scripts using next/script */}
        <Script
          id="isosceles"
          src="https://embed.isosceles.ai/static/js/main.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/@bitjson/qr-code@1.0.2/dist/qr-code.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}