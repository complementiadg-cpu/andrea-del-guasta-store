import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/lib/products";

interface ProductCarouselProps {
  limit?: number;
  filterCategory?: string;
  filterCollection?: string;
  excludeSku?: string;
}

const ProductCarousel = ({
  limit = 8,
  filterCategory,
  filterCollection,
  excludeSku,
}: ProductCarouselProps) => {
  const { data: products, isLoading } = useProducts();

  let list = products ?? [];
  if (excludeSku) {
    list = list.filter((p) => p.sku !== excludeSku);
  }
  if (filterCollection) {
    const f = filterCollection.trim().toLowerCase();
    list = list.filter((p) => p.collection.trim().toLowerCase() === f);
  }
  if (filterCategory && !filterCollection) {
    const f = filterCategory.trim().toLowerCase();
    list = list.filter((p) => p.category.toLowerCase().includes(f));
  }
  list = list.slice(0, limit);

  return (
    <section className="w-full mb-16 px-6">
      {isLoading && (
        <p className="text-sm font-light text-muted-foreground">Caricamento…</p>
      )}
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {list.map((product) => (
            <CarouselItem
              key={product.sku}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
            >
              <Link to={`/product/${encodeURIComponent(product.sku)}`}>
                <Card className="border-none shadow-none bg-transparent group">
                  <CardContent className="p-0">
                    <ProductCarouselImage product={product} />
                    <div className="space-y-1">
                      <p className="text-sm font-light text-muted-foreground">{product.category}</p>
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-serif text-base text-foreground truncate">{product.name}</h3>
                        <p className="text-sm font-light text-foreground whitespace-nowrap">
                          {product.priceLabel}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

const ProductCarouselImage = ({ product }: { product: Product }) => {
  const hasAltImage =
    product.image1 &&
    product.image1 !== product.image &&
    product.image1 !== "/placeholder.svg";
  console.log("ProductCarouselImage", product.sku, product.image, product.image1, hasAltImage);

  return (
    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
          hasAltImage ? "group-hover:opacity-0" : ""
        }`}
      />
      {hasAltImage && (
        <img
          src={product.image1}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
    </div>
  );
};

export default ProductCarousel;
