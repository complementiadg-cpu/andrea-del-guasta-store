import { Link } from "react-router-dom";

const FiftyFiftySection = () => {
  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primo Blocco: Video Orecchini */}
        <div>
          <Link to="/category/orecchini" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              >
                <source
                  src="https://res.cloudinary.com/cjgxjyub/video/upload/v1786993547/stone_site_ecoqim.mp4"
                  type="video/mp4"
                />
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

        {/* Secondo Blocco: Immagine Collezione Stone */}
        <div>
          <Link to="/collection/Stone" className="block">
            <div className="w-full aspect-square mb-3 overflow-hidden">
              <img
                src="https://res.cloudinary.com/cjgxjyub/image/upload/v1786197483/link-bracelet-CMFM2KKw.png_2K_202608021819_bcudf8.jpg"
                alt="Chain link bracelet"
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
