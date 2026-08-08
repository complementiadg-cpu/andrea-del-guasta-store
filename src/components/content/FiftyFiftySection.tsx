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
                  src="https://res.cloudinary.com/cjgxjyub/video/upload/v1786196973/OR2612_c54u62.mp4"
                  type="video/mp4"
                />
                Il tuo browser non supporta i video HTML5.
              </video>
            </div>
          </Link>
          <div>
            <h3 className="text-sm font-normal text-foreground mb-1">
              Organic Forms
            </h3>
            <p className="text-sm font-light text-foreground">
              Nature-inspired pieces with fluid, sculptural details
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
              Chain Collection
            </h3>
            <p className="text-sm font-light text-foreground">
              Refined links and connections in precious metals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFiftySection;
