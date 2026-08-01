import { Link } from "react-router-dom";
import { useTaxonomy } from "@/hooks/useProducts";
import ProductCarousel from "./ProductCarousel";

interface CollectionShowcaseProps {
  /** Which collection of the catalogue to show (0-based, wraps around). */
  index?: number;
  limit?: number;
}

const CollectionShowcase = ({ index = 0, limit = 4 }: CollectionShowcaseProps) => {
  const { collections } = useTaxonomy();

  if (collections.length === 0) return null;

  const collection = collections[index % collections.length];

  return (
    <section className="w-full">
      <div className="px-6 mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground">{collection}</h2>
        <Link
          to={`/collection/${encodeURIComponent(collection)}`}
          className="text-[10px] font-light uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Scopri
        </Link>
      </div>
      <ProductCarousel filterCollection={collection} limit={limit} />
    </section>
  );
};

export default CollectionShowcase;
