import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/products";
import { supportsCustomSize } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [customSize, setCustomSize] = useState("");
  const { addToCart } = useCart();

  const showSizeField = supportsCustomSize(product.category);

  const details: Array<{ label: string; value: string }> = [
    { label: "Materiali", value: product.materiali },
    { label: "Lunghezza", value: product.lunghezza },
    { label: "Chiusura", value: product.chiusura },
    { label: "Design", value: product.design },
  ].filter((d) => d.value && d.value.trim() !== "");

  const handleAdd = () => {
    const size = customSize.trim() !== "" ? `${customSize.trim()} cm` : undefined;
    addToCart(product, quantity, size);
    toast.success(
      size
        ? `${product.name} (${size}) aggiunto al carrello`
        : `${product.name} aggiunto al carrello`
    );
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb - desktop */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {product.category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/category/${encodeURIComponent(product.category.toLowerCase())}`}>
                      {product.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title + price */}
      <div className="flex justify-between items-start gap-6">
        <div>
          {product.category && (
            <p className="text-xs font-light uppercase tracking-widest text-muted-foreground mb-2">
              {product.category}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
            {product.name}
          </h1>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-light text-foreground">{product.priceLabel}</p>
        </div>
      </div>

      {/* Extended narrative description */}
      {product.descrizioneEstesa && (
        <div className="border-t border-border pt-6">
          <p className="text-base font-light text-foreground/80 leading-relaxed whitespace-pre-line">
            {product.descrizioneEstesa}
          </p>
        </div>
      )}

      {/* Technical details */}
      {details.length > 0 && (
        <div className="border-t border-border pt-6">
          <h2 className="text-xs font-medium uppercase tracking-widest text-foreground mb-4">
            Dettagli Tecnici
          </h2>
          <dl className="divide-y divide-border">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3">
                <dt className="text-sm font-light text-muted-foreground">{d.label}</dt>
                <dd className="text-sm font-light text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Style advice box */}
      {product.consiglioStile && product.consiglioStile.trim() !== "" && (
        <div className="border border-foreground/20 bg-muted/30 p-6 md:p-8 relative">
          <div className="absolute -top-3 left-6 bg-background px-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Consiglio di Stile
            </span>
          </div>
          <p className="font-serif text-lg italic leading-relaxed text-foreground mt-2">
            “{product.consiglioStile}”
          </p>
        </div>
      )}

      {/* Quantity + add to cart */}
      <div className="space-y-4 border-t border-border pt-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-foreground">Quantità</span>
          <div className="flex items-center border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              aria-label="Diminuisci quantità"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity((q) => q + 1)}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
              aria-label="Aumenta quantità"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
        >
          Aggiungi al carrello
        </Button>
      </div>

      {product.sku && (
        <p className="text-xs font-light text-muted-foreground">SKU: {product.sku}</p>
      )}
    </div>
  );
};

export default ProductInfo;
