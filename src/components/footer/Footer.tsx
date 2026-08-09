import { Link } from "react-router-dom";
import { useTaxonomy } from "@/hooks/useProducts";

const Footer = () => {
  const { categories } = useTaxonomy();

  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-6 border-t border-[#e5e5e5] mt-48">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <p className="font-serif uppercase tracking-[0.18em] text-lg mb-1">ANDREADELGUASTA</p>
            <p className="text-[10px] uppercase tracking-[0.3em] font-light text-black/60 mb-6">
              couture accessories
            </p>

            {/* Contact Information */}
            <div className="space-y-2 text-sm font-light text-black/70">
              <p className="font-normal text-black mb-1">Contatti</p>
              <p>
                <a
                  href="https://instagram.com/andreadelguasta66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  @andreadelguasta66
                </a>
              </p>
              <p>
                <a href="mailto:complementiadg@gmail.com" className="hover:text-black transition-colors">
                  complementiadg@gmail.com
                </a>
              </p>
            </div>
          </div>


          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Categorie */}
            <div>
              <h4 className="text-sm font-normal mb-4">Categorie</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/category/${encodeURIComponent(category.toLowerCase())}`}
                      className="text-sm font-light text-black/70 hover:text-black transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chi siamo */}
            <div>
              <h4 className="text-sm font-normal mb-4">Chi siamo</h4>
              <ul className="space-y-2">
                <li><Link to="/about/our-story" className="text-sm font-light text-black/70 hover:text-black transition-colors">La nostra storia</Link></li>
                <li><Link to="/about/size-guide" className="text-sm font-light text-black/70 hover:text-black transition-colors">Guida alle taglie</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-black/70 hover:text-black transition-colors">Assistenza clienti</Link></li>
              </ul>
            </div>

            {/* Connettiti */}
            <div>
              <h4 className="text-sm font-normal mb-4">Connettiti</h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com/andreadelguasta66" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="mailto:complementiadg@gmail.com" className="text-sm font-light text-black/70 hover:text-black transition-colors">Email</a></li>
                <li><Link to="/newsletter" className="text-sm font-light text-black/70 hover:text-black transition-colors">Newsletter</Link></li>
              </ul>
            </div>

            {/* Legale */}
            <div>
              <h4 className="text-sm font-normal mb-4">Legale</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-sm font-light text-black/70 hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm font-light text-black/70 hover:text-black transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - edge to edge separator */}
      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            © 2026 ANDREADELGUASTA. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;