import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingBag from "./ShoppingBag";
import { useCart } from "@/contexts/CartContext";
import { useTaxonomy } from "@/hooks/useProducts";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [offCanvasType, setOffCanvasType] = useState<"favorites" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);

  const { totalItems } = useCart();
  const { categories, collections } = useTaxonomy();

  useEffect(() => {
    const imagesToPreload = [
      "/rings-collection.png",
      "/earrings-collection.png",
      "/arcus-bracelet.png",
      "/span-bracelet.png",
      "/founders.png",
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const popularSearches = [
    "Collane oro",
    "Bracciali",
    "Orecchini",
    "Anelli",
    "Nuovi arrivi",
    "Collezione esclusiva",
  ];

  type NavItem = {
    name: string;
    href: string;
    submenuItems: Array<{ label: string; to: string }>;
    images?: Array<{ src: string; alt: string; label: string; to: string }>;
  };

  const navItems: NavItem[] = [
    {
      name: "Categorie",
      href: "/category/shop",
      submenuItems: categories.map((c) => ({
        label: c,
        to: `/category/${encodeURIComponent(c.toLowerCase())}`,
      })),
    },
    {
      name: "Collezioni",
      href: "/category/shop",
      submenuItems: collections.map((c) => ({
        label: c,
        to: `/collection/${encodeURIComponent(c)}`,
      })),
    },
    {
      name: "About",
      href: "/about/our-story",
      submenuItems: [
        { label: "Our Story", to: "/about/our-story" },
        { label: "Sustainability", to: "/about/sustainability" },
        { label: "Size Guide", to: "/about/size-guide" },
        { label: "Customer Care", to: "/about/customer-care" },
        { label: "Store Locator", to: "/about/store-locator" },
      ],
      images: [
        { src: "/founders.png", alt: "Founders", label: "La nostra storia", to: "/about/our-story" },
      ],
    },
  ];

  return (
    <nav
      className="relative"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        <button
          className="lg:hidden p-2 mt-0.5 text-nav-foreground hover:text-nav-hover transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative">
            <span
              className={`absolute block w-5 h-px bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"
              }`}
            />
            <span
              className={`absolute block w-5 h-px bg-current transition-all duration-300 top-2.5 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block w-5 h-px bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"
              }`}
            />
          </div>
        </button>

        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="text-nav-foreground hover:text-nav-hover transition-colors text-sm font-light py-6 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <Link to="/" className="block leading-none">
            <span className="block font-serif uppercase tracking-[0.18em] text-base md:text-lg text-nav-foreground">
              ANDREADELGUASTA
            </span>
            <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-light text-nav-foreground/60 mt-0.5">
              couture accessories
            </span>
          </Link>
        </div>


        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button
            className="hidden lg:block p-2 text-nav-foreground hover:text-nav-hover transition-colors"
            aria-label="Favorites"
            onClick={() => setOffCanvasType("favorites")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors relative"
            aria-label="Shopping bag"
            onClick={() => setIsShoppingBagOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-[0.5rem] font-semibold text-black pointer-events-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeDropdown && (
        <div
          className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between w-full">
              <div className="flex-1">
                <ul className="space-y-2">
                  {navItems
                    .find((i) => i.name === activeDropdown)
                    ?.submenuItems.map((subItem, idx) => (
                      <li key={idx}>
                        <Link
                          to={subItem.to}
                          className="text-nav-foreground hover:text-nav-hover transition-colors text-sm font-light block py-2"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex space-x-6">
                {navItems
                  .find((i) => i.name === activeDropdown)
                  ?.images?.map((image, idx) => (
                    <Link
                      key={idx}
                      to={image.to}
                      className="w-[400px] h-[280px] cursor-pointer group relative overflow-hidden block"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                      />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-light flex items-center gap-1">
                        <span>{image.label}</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <div className="flex items-center border-b border-border pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cerca gioielli..."
                    className="flex-1 bg-transparent text-nav-foreground placeholder:text-nav-foreground/60 outline-none text-lg"
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <h3 className="text-nav-foreground text-sm font-light mb-4">Ricerche popolari</h3>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((search, idx) => (
                    <button
                      key={idx}
                      className="text-nav-foreground hover:text-nav-hover text-sm font-light py-2 px-4 border border-border rounded-full transition-colors hover:border-nav-hover"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-nav border-b border-border z-50">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-nav-foreground hover:text-nav-hover transition-colors text-lg font-light block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <div className="mt-3 pl-4 space-y-2">
                    {item.submenuItems.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        to={subItem.to}
                        className="text-nav-foreground/70 hover:text-nav-hover text-sm font-light block py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShoppingBag
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        onViewFavorites={() => {
          setIsShoppingBagOpen(false);
          setOffCanvasType("favorites");
        }}
      />

      {offCanvasType === "favorites" && (
        <div className="fixed inset-0 z-50 h-screen">
          <div className="absolute inset-0 bg-black/50 h-screen" onClick={() => setOffCanvasType(null)} />
          <div className="absolute right-0 top-0 h-screen w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl text-foreground">Preferiti</h2>
              <button
                onClick={() => setOffCanvasType(null)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Chiudi"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground text-sm font-light mb-6">
                Non hai ancora aggiunto preferiti.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
