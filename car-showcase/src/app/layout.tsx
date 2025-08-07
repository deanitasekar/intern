import Footer from "@/components/footer.component";
import Navbar from "@/components/navbar.component";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
