import { useEffect, useState } from "react";

const CONSENT_KEY = "adg-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, date: new Date().toISOString() }));
    } catch {
      /* storage non disponibile */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Informativa cookie"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur px-6 py-5"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <p className="font-serif uppercase tracking-[0.18em] text-sm text-foreground mb-2">Cookie e privacy</p>
          <p className="text-sm font-light text-muted-foreground leading-relaxed">
            Usiamo cookie tecnici necessari al funzionamento del sito (carrello e preferenze di consenso) e, solo con il tuo
            consenso, cookie non essenziali per migliorare l'esperienza di acquisto. Puoi accettare o proseguire con i soli
            cookie necessari. Dettagli nella{" "}
            <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => decide("necessary")}
            className="text-xs uppercase tracking-[0.18em] border border-border px-6 py-3 text-foreground hover:bg-muted transition-colors"
          >
            Solo necessari
          </button>
          <button
            onClick={() => decide("all")}
            className="text-xs uppercase tracking-[0.18em] bg-foreground text-background px-6 py-3 hover:opacity-80 transition-opacity"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
