import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner"; // o la libreria di toast usata nel progetto

export const ComingSoonForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      // 1. Salvataggio nel database Supabase
      const { error: dbError } = await supabase
        .from("Newsletter")
        .insert([{ email }]);

      if (dbError) throw dbError;

      // 2. Invocazione della Edge Function per la notifica via mail
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
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full">
      <input
        type="email"
        placeholder="Inserisci la tua email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-2 border rounded-md w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
      >
        {loading ? "Invio..." : "Iscriviti"}
      </button>
    </form>
  );
};
