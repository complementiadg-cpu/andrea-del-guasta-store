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
      // 1. Collegamento alla tabella "Newsletter"
      const { error } = await supabase
        .from("Newsletter" as any)
        .insert([{ email }]);

      if (error) {
        // Gestione dell'errore se l'email è già registrata (chiave univoca)
        if (error.code === "23505") {
          toast.info("Risulti già iscritto/a alla nostra newsletter!");
        } else {
          throw error;
        }
      } else {
        // 2. Invocazione facoltativa della Edge Function per l'email di notifica
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-black text-white px-6 py-12">
      {/* Header / Logo */}
      <header className="w-full text-center pt-8">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.25em] uppercase text-zinc-100">
          Andrea Del Guasta
        </h1>
      </header>

      {/* Contenuto Centrale */}
      <main className="max-w-xl w-full text-center space-y-8 my-auto">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium">
            Coming Soon
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white leading-tight">
            Il nuovo store sarà presto disponibile.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base tracking-wide font-light max-w-md mx-auto">
            Iscriviti alla newsletter per ricevere un avviso in anteprima il giorno del lancio.
          </p>
        </div>

        {/* Form Iscrizione */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
          <input
            type="email"
            placeholder="Inserisci la tua email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-400 transition-colors flex-1 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[110px]"
          >
            {isLoading ? "Invio..." : "Iscriviti"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-zinc-600 tracking-wider">
        © {new Date().getFullYear()} Andrea Del Guasta. Tutti i diritti riservati.
      </footer>
    </div>
  );
};

export default ComingSoon;
