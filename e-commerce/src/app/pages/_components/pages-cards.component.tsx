"use client";


interface RelatedProduct {
  id: string;
  title: string;
  image: string;
  badge?: string;
  description: string;
}

export function PagesCards() {
  const relatedProducts: RelatedProduct[] = [
    {
      id: "1",
      title: "Staircase Ideas: New Riser Finishes to Transform Your Staircase",
      image: "/pages-card-1.png",
      badge: "LIFESTYLE",
      description:
        "Our statement staircase ideas can give your hallway a whole new lease of life without any messy building work or plannin...",
    },
    {
      id: "2",
      title: "Staircase Ideas: New Riser Finishes to Transform Your Staircase",
      image: "/pages-card-2.png",
      badge: "NEWS",
      description:
        "Our statement staircase ideas can give your hallway a whole new lease of life without any messy building work or plannin...",
    },
    {
      id: "3",
      title: "Staircase Ideas: New Riser Finishes to Transform Your Staircase",
      image: "/pages-card-3.png",
      badge: "LIFESTYLE",
      description:
        "Our statement staircase ideas can give your hallway a whole new lease of life without any messy building work or plannin...",
    },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "LIFESTYLE":
        return "bg-[#7DB800]";
      case "NEWS":
        return "bg-[#0081B8]";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-lg mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-transparent overflow-hidden">
              <div
                className="relative bg-gray-100 mb-4"
                style={{ height: "200px" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                {product.badge && (
                  <span
                    className={`${getBadgeColor(
                      product.badge
                    )} text-white px-3 py-1 text-xs font-medium uppercase inline-block`}
                    style={{ borderRadius: "3px" }}
                  >
                    {product.badge}
                  </span>
                )}
                <h3 className="text-lg font-medium text-gray-900 leading-tight">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="text-gray-500 text-sm underline hover:text-gray-700 transition-colors"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
}
