import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";

interface ProductCarouselProps {
  limit?: number;
  filterCategory?: string;
}

const ProductCarousel = ({ limit = 8, filterCategory }: ProductCarouselProps) => {
  const { data: products, isLoading } = useProducts();

  let list = products ?? [];
  if (filterCategory) {
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
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/[0.03]" />
                    </div>
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

export default ProductCarousel;
