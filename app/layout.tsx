import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dice App",
  description: "Good luck",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/dice.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
