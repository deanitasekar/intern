import { FeaturedProducts } from "@/app/_components/featured-product.component";
import { Hero } from "@/app/_components/hero.component";
import { Newsletter } from "./newsletter.component";

export default function HomePageMain() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <FeaturedProducts />
      </main>
      <Newsletter />
    </div>
  );
}
