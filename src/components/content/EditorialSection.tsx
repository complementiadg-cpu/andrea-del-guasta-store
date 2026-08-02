import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = "https://res.cloudinary.com/cjgxjyub/image/upload";
const IMAGE_PATH = "v1785688113/WhatsApp_Image_2026-08-02_at_18.27.39_qa8fa8.jpg";

const EditorialSection = () => {
  // URLs Cloudinary ottimizzati per vari breakpoint
  const srcSet = `
    ${BASE_IMAGE_URL}/f_auto,q_auto,w_400/${IMAGE_PATH} 400w,
    ${BASE_IMAGE_URL}/f_auto,q_auto,w_800/${IMAGE_PATH} 800w,
    ${BASE_IMAGE_URL}/f_auto,q_auto,w_1200/${IMAGE_PATH} 1200w
  `;

  return (
    <section className="w-full mb-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 max-w-[630px]">
          <h2 className="text-2xl font-normal text-foreground leading-tight md:text-xl">
            About Andrea
          </h2>
          <p className="text-sm font-light text-foreground leading-relaxed">
            Andrea Del Guasta è un brand fiorentino che unisce tradizione manifatturiera e design contemporaneo. Progetta e produce artigianalmente abbigliamento, accessori e complementi d’arredo couture. Ogni complemento celebra l’unicità e l’inclusione, trasformando la diversità in un segno distintivo di eleganza.
          </p>
          <Link
            to="/about/our-story"
            className="inline-flex items-center gap-1 text-sm font-light text-foreground hover:text-foreground/80 transition-colors duration-200"
          >
            <span>Read our full story</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="order-first md:order-last">
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={`${BASE_IMAGE_URL}/f_auto,q_auto,w_800/${IMAGE_PATH}`}
              srcSet={srcSet}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Andrea Del Guasta Editorial"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
