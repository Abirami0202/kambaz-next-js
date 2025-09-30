// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";  // Keep commented
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationSidebar from "./Kambaz/NavigationSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kambaz - Web Development",
  description: "Full Stack Next.js Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavigationSidebar />
        <main style={{ marginLeft: "120px", padding: "0" }}>
          {children}
        </main>
      </body>
    </html>
  );
}