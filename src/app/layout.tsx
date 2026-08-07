import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: "Learn to Leader",
  description: "Gamified learning for youth employability and entrepreneurship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${fredoka.variable} font-sans bg-brand-light text-brand-dark`}>
        {children}
      </body>
    </html>
  );
}
