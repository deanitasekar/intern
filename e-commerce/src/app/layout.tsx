import { AuthMiddleware } from "@/components/auth-middleware.component";
import { Footer } from "@/components/footer.component";
import { Navbar } from "@/components/navbar.component";
import { AuthProvider } from "@/contexts/auth.context";
import { CartProvider } from "@/contexts/cart.context";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import WishlistProvider from "@/contexts/wishlist.context";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SimpleWood - Premium Furniture",
  description: "Premium wooden furniture and home decor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.className}`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <AuthMiddleware>{children}</AuthMiddleware>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
