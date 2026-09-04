import { Link } from "react-router-dom";

const BASE = "https://res.cloudinary.com/cjgxjyub/image/upload";
const PATH = "v1785346739/GC2602_ajtg6x.jpg";
const img = (w: number) => `${BASE}/f_auto,q_auto,w_${w}/${PATH}`;

const LargeHero = () => {
  return (
    <section className="w-full mb-16 px-6">
      <Link to="/collection/Pearl" className="block">
        <div className="w-full aspect-[4/3] sm:aspect-[16/9] mb-3 overflow-hidden group bg-muted/10">
          <img 
            src={img(1200)}
            srcSet={`${img(600)} 600w, ${img(1200)} 1200w, ${img(1800)} 1800w`}
            sizes="100vw"
            alt="Modern jewelry collection" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="">
        <h2 className="text-sm font-normal text-foreground mb-1">
          Modern Heritage
        </h2>
        <p className="text-sm font-light text-foreground">
          Contemporary jewelry crafted with timeless elegance
        </p>
      </div>
    </section>
  );
};

export default LargeHero;
