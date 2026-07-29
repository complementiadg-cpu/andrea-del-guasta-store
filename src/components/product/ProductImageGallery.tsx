import { useState } from "react";
import ImageZoom from "./ImageZoom";

interface ProductImageGalleryProps {
  image: string;
  name: string;
}

const ProductImageGallery = ({ image, name }: ProductImageGalleryProps) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="w-full aspect-square overflow-hidden cursor-zoom-in bg-muted/10 group"
        onClick={() => setIsZoomOpen(true)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <ImageZoom
        images={[image]}
        initialIndex={0}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
