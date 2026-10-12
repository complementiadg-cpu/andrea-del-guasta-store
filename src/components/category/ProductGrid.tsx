import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  filterCategory?: string; // e.g. "orecchini", "bracciale"
  filterCollection?: string;
  showCategoryFilters?: boolean;
  onCountChange?: (n: number) => void;
}

const normalize = (s: string) => s.trim().toLowerCase();

const ProductGrid = ({ filterCategory, filterCollection, showCategoryFilters }: ProductGridProps) => {
  const { data: products, isLoading, error } = useProducts();
  const activeRouteCategory =
    filterCategory && !["all", "shop"].includes(normalize(filterCategory)) ? normalize(filterCategory) : null;
  const activeRouteCollection =
    filterCollection && normalize(filterCollection) !== "all" ? normalize(filterCollection) : null;

  const categories = useMemo(() => {
    if (!products) return [];
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set).sort();
  }, [products]);

  const collections = useMemo(() => {
    if (!products) return [];
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.collection) set.add(p.collection.trim());
    });
    return Array.from(set).sort();
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    const routeFilter =
      filterCategory && normalize(filterCategory) !== "all" && normalize(filterCategory) !== "shop"
        ? normalize(filterCategory)
        : null;
    const routeCollection =
      filterCollection && normalize(filterCollection) !== "all" ? normalize(filterCollection) : null;

    return products.filter((p) => {
      const cat = normalize(p.category);
      const col = normalize(p.collection);
      if (routeFilter && cat !== routeFilter && !cat.includes(routeFilter) && !routeFilter.includes(cat))
        return false;
      if (routeCollection && col !== routeCollection) return false;
      return true;
    });
  }, [products, filterCategory, filterCollection]);

  return (
    <section className="w-full px-4 sm:px-6 mb-16">
      {showCategoryFilters && (categories.length > 0 || collections.length > 0) && (
        <div className="mb-8 space-y-4">
          {categories.length > 0 && (
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Categorie
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Tutte" to="/category/shop" active={!activeRouteCategory && !activeRouteCollection} />
                {categories.map((c) => (
                  <FilterChip
                    key={c}
                    label={c}
                    to={`/category/${encodeURIComponent(c.toLowerCase())}`}
                    active={activeRouteCategory === normalize(c)}
                  />
                ))}
              </div>
            </div>
          )}
          {collections.length > 0 && (
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Collezioni
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Tutte" to="/collection/all" active={false} />
                {collections.map((c) => (
                  <FilterChip
                    key={c}
                    label={c}
                    to={`/collection/${encodeURIComponent(c)}`}
                    active={activeRouteCollection === normalize(c)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <p className="text-sm font-light text-muted-foreground">Caricamento prodotti…</p>
      )}
      {error && (
        <p className="text-sm font-light text-destructive">
          Impossibile caricare i prodotti. Verifica la connessione al database.
        </p>
      )}
      {!isLoading && !error && filtered.length === 0 && (
        <p className="text-sm font-light text-muted-foreground">Nessun prodotto disponibile.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </section>
  );
};

const FilterChip = ({ label, active, to }: { label: string; active: boolean; to: string }) => (
  <Link
    to={to}
    aria-current={active ? "page" : undefined}
    className={`px-4 py-2 text-sm font-light border transition-colors ${
      active
        ? "bg-foreground text-background border-foreground"
        : "bg-transparent text-foreground border-border hover:border-foreground"
    }`}
  >
    {label}
  </Link>
);

const ProductCard = ({ product }: { product: Product }) => {
  const hasAltImage =
    product.image1 && product.image1 !== product.image && product.image1 !== "/placeholder.svg";

  return (
    <Link to={`/product/${encodeURIComponent(product.sku)}`}>
      <Card className="border-none shadow-none bg-transparent group cursor-pointer">
        <CardContent className="p-0">
          <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                hasAltImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {hasAltImage && (
              <img
                src={product.image1}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-light text-muted-foreground">{product.category}</p>
            <div className="flex justify-between items-center gap-2">
              <h3 className="font-serif text-base text-foreground truncate">{product.name}</h3>
              <p className="text-sm font-light text-foreground whitespace-nowrap">{product.priceLabel}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};


export default ProductGrid;
