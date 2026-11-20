import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import pearlEditorial from "@/assets/home-pearl-editorial.webp.asset.json";
import metalEditorial from "@/assets/home-metal-editorial.webp.asset.json";
import stoneEditorial from "@/assets/home-stone-editorial.webp.asset.json";

const slides = [
  {
    src: pearlEditorial.url,
    alt: "Collana e orecchini con perle in un editoriale couture",
  },
  {
    src: metalEditorial.url,
    alt: "Orecchini e bracciale argento dalle forme scultoree",
  },
  {
    src: stoneEditorial.url,
    alt: "Bracciale e anello con pietre su travertino toscano",
  },
];

const HomeImageBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => api.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [api, isPaused]);

  return (
    <section
      aria-label="Galleria editoriale"
      className="relative mb-16 w-full overflow-hidden bg-muted/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.src}
              className="relative aspect-video pl-0"
              aria-label={`${index + 1} di ${slides.length}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={1536}
                height={864}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Immagine precedente"
          className="left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-none border-0 bg-background/80 text-foreground shadow-none hover:bg-background md:left-6"
        />
        <CarouselNext
          aria-label="Immagine successiva"
          className="right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-none border-0 bg-background/80 text-foreground shadow-none hover:bg-background md:right-6"
        />
      </Carousel>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-foreground/80 via-foreground/35 to-transparent px-14 pb-12 pt-8 sm:px-10 sm:pb-16 sm:pt-24 md:px-14 lg:px-20">
        <div className="max-w-5xl text-background">
          <h1 className="font-serif text-[clamp(0.875rem,3.5vw,3.75rem)] font-normal uppercase leading-tight tracking-[0.12em] sm:tracking-[0.18em]">
            Presenze Essenziali
          </h1>
          <p className="mt-2 max-w-md font-sans text-[0.7rem] font-light leading-relaxed tracking-wide text-background/90 sm:mt-3 sm:text-sm md:text-base">
            Micro-sculture di luce che trasformano il gioiello in un incontro inatteso.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Vai all'immagine ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => api?.scrollTo(index)}
            className={`h-1 transition-all duration-300 ${
              selectedIndex === index ? "w-10 bg-background" : "w-6 bg-background/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeImageBanner;
