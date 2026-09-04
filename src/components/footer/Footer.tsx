import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black pt-8 pb-2 px-4 sm:px-6 border-t border-[#e5e5e5] mt-16 sm:mt-32 lg:mt-48">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 mb-8">
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
                <a href="mailto:info@andreadelguasta.com" className="hover:text-black transition-colors">
                  info@andreadelguasta.com
                </a>
              </p>
            </div>
          </div>


          {/* Link lists - Right side */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Chi siamo */}
            <div>
              <h4 className="text-sm font-normal mb-4">Chi siamo</h4>
              <ul className="space-y-1.5">
                <li><Link to="/about/our-story" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">La nostra storia</Link></li>
                <li><Link to="/about/size-guide" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Guida alle taglie</Link></li>
                <li><Link to="/about/customer-care" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Assistenza clienti</Link></li>
              </ul>
            </div>

            {/* Connettiti */}
            <div>
              <h4 className="text-sm font-normal mb-4">Connettiti</h4>
              <ul className="space-y-1.5">
                <li><a href="https://instagram.com/andreadelguasta66" target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="mailto:info@andreadelguasta.com" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Email</a></li>
                <li><Link to="/newsletter" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Newsletter</Link></li>
              </ul>
            </div>

            {/* Legale */}
            <div>
              <h4 className="text-sm font-normal mb-4">Legale</h4>
              <ul className="space-y-1.5">
                <li><Link to="/privacy-policy" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="inline-block py-1 text-sm font-light text-black/70 hover:text-black transition-colors">Terms of Service</Link></li>
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