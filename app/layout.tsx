import { ReactNode } from "react";

import "./globals.css";

// fr-FR locale is imported as frFR
import { frFR } from '@clerk/localizations'

import { type Metadata } from "next";
import { Lexend } from "next/font/google";

import Navbar from "@/components/Navbar";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";


const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Converso",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "gray" }}} localization={frFR}>
      <html lang="en">
        <body className={`${lexend.variable} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
