import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../../globals.css";
import Header from "./header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NavItems } from "./config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EagleWay Property Rental LLC Admin Panel",
  description: "Admin Panel for EagleWay Property Rental LLC",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
                      <AppSidebar navItems={NavItems} />
          <main className="w-full">
              <div className="ml-5 mt-4 mr-3">
                <Header />
        {children}
              </div>
              </main>
        
        </SidebarProvider>
      </body>
    </html>
  );
}
