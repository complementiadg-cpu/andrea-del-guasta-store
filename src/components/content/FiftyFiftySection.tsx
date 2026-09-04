import { Link } from "react-router-dom";

const V_BASE = "https://res.cloudinary.com/cjgxjyub/video/upload";
const V_PATH = "v1786993547/stone_site_ecoqim";
const I_BASE = "https://res.cloudinary.com/cjgxjyub/image/upload";
const I_PATH = "v1786197483/link-bracelet-CMFM2KKw.png_2K_202608021819_bcudf8.jpg";

const heroImg = (w: number) => `${I_BASE}/f_auto,q_auto,w_${w}/${I_PATH}`;

const FiftyFiftySection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primo Blocco: Video Orecchini */}
        <div>
          <Link to="/category/orecchini" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden bg-muted/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster={`${I_BASE}/f_auto,q_auto,w_800/${V_PATH}.jpg`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              >
                <source
                  src={`${V_BASE}/f_auto,q_auto,w_720/${V_PATH}.mp4`}
                  type="video/mp4"
                  media="(max-width: 768px)"
                />
                <source src={`${V_BASE}/f_auto,q_auto,w_1280/${V_PATH}.mp4`} type="video/mp4" />
                Il tuo browser non supporta i video HTML5.
              </video>
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">
              Minimal in form, bold in presence
            </h3>
            <p className="text-sm font-light text-foreground">
              Flexible, luminous and endlessly expressive
            </p>
          </div>
        </div>

        {/* Secondo Blocco: Immagine Collezione Stone (LCP) */}
        <div>
          <Link to="/collection/Stone" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden bg-muted/10">
              <img
                src={heroImg(800)}
                srcSet={`${heroImg(400)} 400w, ${heroImg(800)} 800w, ${heroImg(1200)} 1200w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Chain link bracelet"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">
              Stone Collection
            </h3>
            <p className="text-sm font-light text-foreground">
              Refined links and stones with exquisite plated finishes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
