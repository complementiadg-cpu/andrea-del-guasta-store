import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const { error: dbError } = await supabase
        .from("Newsletter")
        .insert([{ email }]);

      if (dbError) throw dbError;

      await supabase.functions.invoke("send-newsletter-notification", {
        body: { subscriberEmail: email },
      });

      toast.success("Grazie! Ti avviseremo non appena saremo online.");
      setEmail("");
    } catch (error: any) {
      console.error("Errore iscrizione newsletter:", error);
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase">
          Andrea Del Guasta
        </h1>
        <p className="text-zinc-400 text-lg tracking-wide">
          Il nuovo store sarà presto disponibile. Lascia la tua email per rimanere aggiornato.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full pt-4">
          <input
            type="email"
            placeholder="Inserisci la tua email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-white flex-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Invio..." : "Iscriviti"}
          </button>
        </form>
      </div>
    </main>
  );
}
