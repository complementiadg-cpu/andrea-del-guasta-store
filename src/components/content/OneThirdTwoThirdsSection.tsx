import { Link } from "react-router-dom";

const OneThirdTwoThirdsSection = () => {
  return (
    <section className="w-full mb-16 px-4 sm:px-6">
      {/* Layout Flex su desktop per permettere al blocco immagine di occupare lo spazio rimanente */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Blocco 1: Video 1:1 con Altezza e Proporzione Fissa */}
        <div className="w-full lg:w-auto flex flex-col shrink-0">
          <Link 
            to="/category/orecchini" 
            className="block overflow-hidden group rounded-sm"
          >
            {/* Su desktop l'altezza è fissa (es. h-[600px]) e con aspect-square resta sempre 1:1 */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-[600px] aspect-square mb-3 overflow-hidden bg-neutral-100">
              <video
                src="https://res.cloudinary.com/cjgxjyub/video/upload/v1786196973/OR2612_c54u62.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">
              Fluid Forms
            </h3>
            <p className="text-sm font-light text-foreground/80">
              Vintage-inspired pieces with fluid, sculptural details
            </p>
          </div>
        </div>

        {/* Blocco 2: Immagine che si adatta a riempire tutto lo spazio rimanente */}
        <div className="w-full lg:flex-1 flex flex-col min-w-0">
          <Link 
            to="/collection/metal" 
            className="block overflow-hidden group rounded-sm"
          >
            {/* Stessa altezza del video su desktop per un allineamento perfetto */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-[600px] mb-3 overflow-hidden bg-neutral-100">
              <img 
                src="https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1600/v1786993056/GC2605_4_wcbvcg.jpg" 
                srcSet="
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_600/v1786993056/GC2605_4_wcbvcg.jpg 600w,
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1000/v1786993056/GC2605_4_wcbvcg.jpg 1000w,
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1600/v1786993056/GC2605_4_wcbvcg.jpg 1600w
                "
                sizes="(max-width: 1024px) 100vw, 70vw"
                alt="Metal Pride collection" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">
              Metal Pride
            </h3>
            <p className="text-sm font-light text-foreground/80">
              Geometric perfection meets contemporary minimalism
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;
