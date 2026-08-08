import { Link } from "react-router-dom";

const LargeHero = () => {
  return (
    <section className="w-full mb-16 px-6">
      <Link to="/collection/Pearl" className="block">
        <div className="w-full aspect-[4/3] sm:aspect-[16/9] mb-3 overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/cjgxjyub/image/upload/v1785346739/GC2602_ajtg6x.jpg" 
            alt="Modern jewelry collection" 
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
