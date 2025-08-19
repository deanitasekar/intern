import { useState, useMemo, useCallback } from "react";
import { useProducts, useCategories } from "@/hooks/use-product.hook";
import { Product } from "@/types/product.type";

export const useProductsForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const { products, isLoading, error, mutate } = useProducts(20, sortBy);
  const { categories } = useCategories();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product: Product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (
        searchQuery &&
        !product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, priceRange]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const clearCategoryFilter = useCallback(() => {
    setSelectedCategory("");
  }, []);

  const handleSortChange = useCallback((sort: "asc" | "desc") => {
    setSortBy(sort);
  }, []);

  const handleViewModeChange = useCallback((mode: "grid" | "list") => {
    setViewMode(mode);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setPriceRange(range);
  }, []);

  const handleSizeToggle = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const handleColorToggle = useCallback((color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }, []);

  const handleStyleToggle = useCallback((style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategory("");
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedStyles([]);
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory) count++;
    if (searchQuery) count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    count += selectedSizes.length;
    count += selectedColors.length;
    count += selectedStyles.length;
    return count;
  }, [
    selectedCategory,
    searchQuery,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedStyles,
  ]);

  const hasActiveFilters = useMemo(() => {
    return activeFiltersCount > 0;
  }, [activeFiltersCount]);

  return {
    products,
    filteredProducts,
    categories,
    isLoading,
    error,
    mutate,

    selectedCategory,
    sortBy,
    viewMode,
    searchQuery,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedStyles,

    activeFiltersCount,
    hasActiveFilters,
    totalItems: filteredProducts.length,

    handleCategoryChange,
    clearCategoryFilter,
    handleSortChange,
    handleViewModeChange,
    handleSearchChange,
    clearSearch,
    handlePriceRangeChange,
    handleSizeToggle,
    handleColorToggle,
    handleStyleToggle,
    clearAllFilters,
  };
};

export const useProductComparison = () => {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const maxCompareItems = 4;

  const addToCompare = useCallback((product: Product) => {
    setComparedProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      if (prev.length >= maxCompareItems) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: number) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparedProducts([]);
  }, []);

  const isInComparison = useCallback(
    (productId: number) => {
      return comparedProducts.some((p) => p.id === productId);
    },
    [comparedProducts]
  );

  const canAddMore = useMemo(() => {
    return comparedProducts.length < maxCompareItems;
  }, [comparedProducts.length]);

  return {
    comparedProducts,
    comparedCount: comparedProducts.length,
    maxCompareItems,
    canAddMore,
    addToCompare,
    removeFromCompare,
    clearComparison,
    isInComparison,
  };
};

export const useProductsAnalytics = () => {
  const trackProductView = useCallback((productId: string) => {
    console.log("Product viewed:", productId);
  }, []);

  const trackCategoryFilter = useCallback((category: string) => {
    console.log("Category filtered:", category);
  }, []);

  const trackSearchQuery = useCallback((query: string) => {
    console.log("Search query:", query);
  }, []);

  const trackSortChange = useCallback((sortBy: string) => {
    console.log("Sort changed:", sortBy);
  }, []);

  return {
    trackProductView,
    trackCategoryFilter,
    trackSearchQuery,
    trackSortChange,
  };
};
