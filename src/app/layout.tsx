"use client";
import { Geist_Mono, Plus_Jakarta_Sans, Geist } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from '@/lib/query-provider';
import { Toaster } from 'sonner';
import { UserProvider } from '@/context/auth-context';



const plusJarkartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jarkarta-sans',
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Bolt Payments - All in one payment solution</title>
      </head>
      <body
        className={`${plusJarkartaSans.variable} antialiased`}
      >
        <Toaster richColors />
        <UserProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
