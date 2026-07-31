import { useEffect, useState } from "react";
import ImageZoom from "./ImageZoom";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const gallery = images.length > 0 ? images : ["/placeholder.svg"];
  const current = gallery[Math.min(activeIndex, gallery.length - 1)];

  return (
    <div className="w-full">
      <div
        className="w-full aspect-square overflow-hidden cursor-zoom-in bg-muted/10 group"
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={current}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-3">
          {gallery.map((img, index) => (
            <button
              key={img + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              onDoubleClick={() => {
                setActiveIndex(index);
                setIsZoomOpen(true);
              }}
              aria-label={`Vedi immagine ${index + 1} di ${name}`}
              className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden bg-muted/10 border transition-colors ${
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent hover:border-border"
              }`}
            >
              <img
                src={img}
                alt={`${name} — miniatura ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <ImageZoom
        images={gallery}
        initialIndex={activeIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
