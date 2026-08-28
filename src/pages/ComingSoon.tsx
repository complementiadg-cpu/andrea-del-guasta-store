import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // Collegamento alla tabella "Newsletter" esistente
      const { error } = await supabase
        .from("Newsletter" as any)
        .insert([{ email }]);

      if (error) {
        // Gestione dell'errore se l'email è già registrata
        if (error.code === "23505") {
          toast.info("Risulti già iscritto/a alla nostra newsletter!");
        } else {
          throw error;
        }
      } else {
        // Notifica tramite Edge Function
        try {
          await supabase.functions.invoke("send-newsletter-notification", {
            body: { subscriberEmail: email },
          });
        } catch (fnError) {
          console.error("Errore notifica email:", fnError);
        }

        toast.success("Grazie! Ti avviseremo non appena saremo online.");
        setEmail("");
      }
    } catch (error) {
      console.error("Errore salvataggio email:", error);
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden">
      {/* Immagine / Overlay di Sfondo */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black pointer-events-none" />

      {/* Header / Brand Logo */}
      <header className="relative z-10 w-full py-8 text-center border-b border-zinc-900/50 backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-zinc-100">
          Andrea Del Guasta
        </h1>
      </header>

      {/* Contenuto Principale */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 text-center my-auto py-12 space-y-8">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-zinc-400 font-medium">
            Nuova Collezione In Arrivo
          </span>
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
            Esclusività & Design
          </h2>
          <p className="text-zinc-400 text-sm md:text-base tracking-wide font-light max-w-md mx-auto leading-relaxed">
            Stiamo preparando il nuovo store online. Iscriviti per ricevere un invito riservato prima del lancio ufficiale.
          </p>
        </div>

        {/* Form di Iscrizione */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full pt-2">
          <input
            type="email"
            placeholder="Inserisci la tua email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="px-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-300 transition-all flex-1 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-all disabled:opacity-50 min-w-[120px]"
          >
            {isLoading ? "Invio..." : "Iscriviti"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-[11px] text-zinc-600 tracking-widest uppercase border-t border-zinc-900/50">
        © {new Date().getFullYear()} Andrea Del Guasta. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
