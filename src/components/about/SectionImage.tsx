interface SectionImageProps {
  image?: string;
  alt: string;
  caption?: string;
  ratio?: "wide" | "tall" | "square";
  className?: string;
}

const ratioClass: Record<NonNullable<SectionImageProps["ratio"]>, string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

const SectionImage = ({
  image,
  alt,
  caption,
  ratio = "wide",
  className = "",
}: SectionImageProps) => {
  const hasImage = Boolean(image && image.trim().length > 0);

  return (
    <figure className={`my-10 max-w-4xl ${className}`}>
      <div
        className={`relative w-full overflow-hidden border border-border bg-secondary ${ratioClass[ratio]}`}
      >
        {hasImage ? (
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="h-px w-12 bg-border" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Spazio immagine
            </span>
            <span className="max-w-md text-xs font-light text-muted-foreground/80">
              {alt}
            </span>
          </div>
        )}
      </div>
      {hasImage && caption && (
        <figcaption className="mt-3 text-xs font-light text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default SectionImage;
