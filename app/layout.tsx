// app/layout.tsx
"use client";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navigation Sidebar - Hidden on screens smaller than md (768px) */}
        <div className="d-none d-md-block">
          <NavigationSidebar />
        </div>
        <main 
          style={{ 
            marginLeft: "120px", 
            padding: "0" 
          }}
          className="d-none d-md-block"
        >
          {children}
        </main>
        {/* Full width content on small screens */}
        <main 
          style={{ 
            marginLeft: "0", 
            padding: "0" 
          }}
          className="d-block d-md-none"
        >
          {children}
        </main>
      </body>
    </html>
  );
}