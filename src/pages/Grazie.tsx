import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import CheckoutHeader from "@/components/header/CheckoutHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatEuro } from "@/lib/products";
import { confirmStripeSession, type ConfirmedSession } from "@/lib/stripe";

const Grazie = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<ConfirmedSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    if (!sessionId) {
      setError("Nessun pagamento da confermare.");
      setLoading(false);
      return;
    }

    confirmStripeSession(sessionId)
      .then((result) => {
        setSession(result);
        if (result.paid) clearCart();
      })
      .catch((err) => {
        console.error(err);
        setError("Non è stato possibile verificare il pagamento.");
      })
      .finally(() => setLoading(false));
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CheckoutHeader />

      <main className="flex-1 pt-12 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {loading && (
            <div className="py-24 flex flex-col items-center gap-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm font-light text-muted-foreground">
                Verifica del pagamento in corso…
              </p>
            </div>
          )}

          {!loading && session?.paid && (
            <>
              <div className="mx-auto w-14 h-14 border border-foreground/20 rounded-full flex items-center justify-center mb-8">
                <Check className="h-6 w-6 text-foreground" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Grazie per il tuo ordine
              </h1>
              <p className="text-sm md:text-base font-light text-muted-foreground max-w-lg mx-auto">
                Il pagamento è stato ricevuto correttamente
                {session.email ? ` e la conferma è stata inviata a ${session.email}` : ""}.
                Ogni pezzo viene preparato a mano nel nostro laboratorio in Toscana.
              </p>

              <div className="mt-12 text-left border border-border p-6 md:p-8">
                <h2 className="font-serif text-xl text-foreground mb-6">Riepilogo</h2>
                <div className="space-y-4">
                  {session.items.map((item, index) => (
                    <div key={index} className="flex justify-between gap-4 text-sm font-light">
                      <span className="text-foreground">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-muted-foreground"> × {item.quantity}</span>
                        )}
                      </span>
                      <span className="text-foreground whitespace-nowrap">
                        {formatEuro(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-border mt-6 pt-4">
                  <span className="text-sm font-light text-foreground">Totale pagato</span>
                  <span className="text-base font-medium text-foreground">
                    {formatEuro(session.amountTotal)}
                  </span>
                </div>
                {session.orderId && (
                  <p className="text-xs font-light text-muted-foreground mt-4">
                    Riferimento ordine: {session.orderId}
                  </p>
                )}
              </div>
            </>
          )}

          {!loading && !session?.paid && (
            <>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Pagamento non completato
              </h1>
              <p className="text-sm font-light text-muted-foreground max-w-lg mx-auto">
                {error ??
                  "Il pagamento risulta ancora in sospeso. Se hai completato l'operazione, riceverai una conferma via email."}
              </p>
            </>
          )}

          {!loading && (
            <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-none" size="lg">
                <Link to="/category/shop">Continua lo shopping</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-none" size="lg">
                <Link to="/about/customer-care">Assistenza clienti</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Grazie;
