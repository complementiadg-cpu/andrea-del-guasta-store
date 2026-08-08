const Footer = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-normal mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">New In</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Rings</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Earrings</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Bracelets</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Necklaces</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-normal mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Care Instructions</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Returns</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Shipping</a></li>
                <li><a href="#" className="text-sm font-light text-black/70 hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-normal mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com/andreadelguasta66" target="_blank" rel="noopener noreferrer" className="text-sm font-light text-black/70 hover:text-black transition-colors">Instagram</a></li>
                <li><a href="mailto:complementiadg@gmail.com" className="text-sm font-light text-black/70 hover:text-black transition-colors">Email</a></li>

                <li><a href="/newsletter" className="text-sm font-light text-black/70 hover:text-black transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - edge to edge separator */}
      <div className="border-t border-[#e5e5e5] -mx-6 px-6 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-black mb-1 md:mb-0">
            © 2026 ANDREADELGUASTA. All rights reserved. Template made by{" "}
            <a href="https://www.liljeros.co" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors underline">
              Rickard Liljeros
            </a>
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-sm font-light text-black hover:text-black/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;