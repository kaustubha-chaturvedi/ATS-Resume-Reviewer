import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const qs = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-screen w-screen">
      <body className={`${qs.className} h-screen`}>{children}</body>
    </html>
  );
}
