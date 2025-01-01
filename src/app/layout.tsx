import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "the Diary App",
  description: "The only Journaling App you will ever need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" p-0 m-0">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
