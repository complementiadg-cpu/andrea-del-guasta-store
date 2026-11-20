import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface SlideItem {
  baseUrl: string;
  alt: string;
}

const slides: SlideItem[] = [
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795170803/magnific_ricrea-cambiando-la-collana-indossata-dalla-modella-con-quella_JNCTdYIOq4_hgymnk.jpg",
    alt: "Modella che indossa i bijoux della capsule collection Presenze Essenziali",
  },
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795170845/magnific_ricrea-con-materiali-realistici-su-un-tessuto_79fTVDKJAL_htlbdg.png",
    alt: "Insetto scultoreo di perline posato su collana e tessuto botanico scuro",
  },
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795170849/magnific_ricrea-con-uno-sfondo-di-tessuto-fogliage-color_SyhcRohUb8_fjssyz.png",
    alt: "Fili di perle e catene con micro-scultura di perline su sfondo foliage",
  },
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795171315/magnific_ricrea-con-materiali-realistici-su-un-tessuto_Lw8GRXEswO_kpu2oe.png",
    alt: "Ragno artigianale in perline su filo di perle e catene metalliche",
  },
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795171329/magnific_ricrea-con-materiali-realistici-su-un-tessuto_DoObyO5pcl_jbfjrf.jpg",
    alt: "Libellula intrecciata a mano abbinata ai bijoux Andrea Del Guasta",
  },
  {
    baseUrl:
      "https://res.cloudinary.com/cjgxjyub/image/upload/v1795173045/magnific_ricrea-con-materiali-realistici-su-un-tessuto_UPvf7ycwny_aosupu.png",
    alt: "Dettaglio scultoreo di perline e bijoux su tessuto materico",
  },
];

// Genera URL Cloudinary ottimizzati (formato automatico WebP/AVIF, qualità automatica e ridimensionamento)
const getOptimizedCloudinaryUrl = (url: string, width: number) => {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

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
      aria-label="Galleria editoriale Presenze Essenziali"
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
              key={slide.baseUrl}
              className="relative aspect-[4/3] pl-0 sm:aspect-video"
              aria-label={`${index + 1} di ${slides.length}`}
            >
              <img
                src={getOptimizedCloudinaryUrl(slide.baseUrl, 1600)}
                srcSet={`
                  ${getOptimizedCloudinaryUrl(slide.baseUrl, 640)} 640w,
                  ${getOptimizedCloudinaryUrl(slide.baseUrl, 1024)} 1024w,
                  ${getOptimizedCloudinaryUrl(slide.baseUrl, 1600)} 1600w,
                  ${getOptimizedCloudinaryUrl(slide.baseUrl, 2200)} 2200w
                `}
                sizes="100vw"
                alt={slide.alt}
                width={1600}
                height={900}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Sfumatura centrale delicata per garantire leggibilità su tutte le foto */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/30"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label="Immagine precedente"
          className="left-3 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-none border-0 bg-background/80 text-foreground shadow-none hover:bg-background md:left-6 md:h-10 md:w-10"
        />
        <CarouselNext
          aria-label="Immagine successiva"
          className="right-3 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-none border-0 bg-background/80 text-foreground shadow-none hover:bg-background md:right-6 md:h-10 md:w-10"
        />
      </Carousel>

      {/* Overlay testuale centrato sopra lo slider */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center text-white sm:px-20">
        <h1 className="font-serif text-xl uppercase tracking-[0.22em] drop-shadow-sm sm:text-3xl md:text-4xl lg:text-[42px]">
          Presenze Essenziali
        </h1>
        <p className="mt-2 max-w-xl text-xs font-light tracking-wide text-white/90 drop-shadow-sm sm:mt-3 sm:text-sm md:text-base">
          Micro-sculture di luce che trasformano il gioiello in un incontro inatteso.
        </p>
        <span className="mt-5 font-serif text-xs italic tracking-[0.18em] text-white/95 drop-shadow-sm sm:mt-7 sm:text-sm md:text-base">
          Presto Online
        </span>
      </div>

      {/* Indicatori slide */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 sm:bottom-5">
        {slides.map((slide, index) => (
          <button
            key={slide.baseUrl}
            type="button"
            aria-label={`Vai all'immagine ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => api?.scrollTo(index)}
            className={`h-1 transition-all duration-300 ${
              selectedIndex === index ? "w-10 bg-white" : "w-6 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeImageBanner;
