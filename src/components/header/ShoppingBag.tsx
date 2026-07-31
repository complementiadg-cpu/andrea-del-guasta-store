import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { formatEuro } from "@/lib/products";

interface ShoppingBagProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFavorites?: () => void;
}

const ShoppingBag = ({ isOpen, onClose, onViewFavorites }: ShoppingBagProps) => {
  const { items, updateQuantity, subtotal } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen">
      <div className="absolute inset-0 bg-black/50 h-screen" onClick={onClose} />

      <div className="absolute right-0 top-0 h-screen w-96 max-w-full bg-background border-l border-border animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">Carrello</h2>
          <button
            onClick={onClose}
            className="p-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Chiudi"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {onViewFavorites && (
            <div className="md:hidden mb-6 pb-6 border-b border-border">
              <button
                onClick={onViewFavorites}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-border text-nav-foreground hover:text-nav-hover hover:border-nav-hover transition-colors"
              >
                <span className="text-sm font-light">Preferiti</span>
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center font-light">
                Il tuo carrello è vuoto.
                <br />
                Continua lo shopping per aggiungere gioielli.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-6 mb-6 -mr-2 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted/10 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="min-w-0">
                          <p className="text-xs font-light text-muted-foreground">{item.category}</p>
                          <h3 className="font-serif text-base text-foreground truncate">{item.name}</h3>
                          {item.customSize && (
                            <p className="text-xs font-light text-muted-foreground mt-0.5">
                              Misura: {item.customSize}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-light text-foreground whitespace-nowrap">
                          {item.priceLabel}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted/50 transition-colors"
                            aria-label="Diminuisci"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-2 text-sm font-light min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted/50 transition-colors"
                            aria-label="Aumenta"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-foreground">Subtotale</span>
                  <span className="text-sm font-medium text-foreground">{formatEuro(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground font-light">
                  Spedizione e tasse calcolate al checkout
                </p>
                <Button asChild className="w-full rounded-none" size="lg" onClick={onClose}>
                  <Link to="/checkout">Procedi al Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-none"
                  size="lg"
                  onClick={onClose}
                  asChild
                >
                  <Link to="/category/shop">Continua lo shopping</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
