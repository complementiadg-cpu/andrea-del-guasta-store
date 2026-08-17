import { Link } from "react-router-dom";

const OneThirdTwoThirdsSection = () => {
  return (
    <section className="w-full mb-16 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Prima colonna su desktop (2/3) - Immagine Metal Pride (Adattabile) */}
        <div className="lg:col-span-2 flex flex-col">
          <Link 
            to="/collection/metal" 
            className="block overflow-hidden group rounded-sm"
          >
            <div className="w-full h-[400px] sm:h-[550px] lg:h-[800px] mb-3 overflow-hidden bg-neutral-100">
              <img 
                src="https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1600/v1786993056/GC2605_4_wcbvcg.jpg" 
                srcSet="
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_600/v1786993056/GC2605_4_wcbvcg.jpg 600w,
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1000/v1786993056/GC2605_4_wcbvcg.jpg 1000w,
                  https://res.cloudinary.com/cjgxjyub/image/upload/f_auto,q_auto,w_1600/v1786993056/GC2605_4_wcbvcg.jpg 1600w
                "
                sizes="(max-width: 1024px) 100vw, 66vw"
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

        {/* Seconda colonna su desktop (1/3) - Video Formato 1:1 (Quadrato Fisso) */}
        <div className="lg:col-span-1 flex flex-col">
          <Link 
            to="/category/orecchini" 
            className="block overflow-hidden group rounded-sm"
          >
            <div className="w-full aspect-square mb-3 overflow-hidden bg-neutral-100">
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

      </div>
    </section>
  );
};

export default OneThirdTwoThirdsSection;
