import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // 1. Salvataggio nella tabella Newsletter
      const { error } = await supabase
        .from("Newsletter" as any)
        .insert([{ email }]);

      if (error) {
        // Gestione errore se l'email è già presente
        if (error.code === "23505") {
          toast.info("Risulti già iscritto/a alla nostra newsletter!");
        } else {
          throw error;
        }
      } else {
        // 2. Invocazione Edge Function per la notifica via email
        try {
          await supabase.functions.invoke("send-newsletter-notification", {
            body: { subscriberEmail: email },
          });
        } catch (fnError) {
          console.error("Errore invio notifica email:", fnError);
        }

        toast.success("Grazie! Ti avviseremo non appena saremo online.");
        setEmail("");
      }
    } catch (error) {
      console.error("Errore salvataggio email:", error);
      toast.error("Si è verificato un errore. Riprova più tardi.");
    } fontally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-8 md:p-12">
      {/* Header / Logo minimal */}
      <header className="flex justify-center">
        <h1 className="font-serif text-2xl uppercase tracking-widest text-foreground">
          Andrea Del Guasta
        </h1>
      </header>

      {/* Contenuto Principale */}
      <main className="max-w-xl mx-auto text-center space-y-6 my-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Prossimamente
        </span>

        <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light leading-tight">
          Qualcosa di unico sta per arrivare.
        </h2>

        <p className="text-sm font-light text-muted-foreground leading-relaxed">
          Il nostro nuovo shop online sarà disponibile a breve. Lascia la tua email per ricevere un invito esclusivo al lancio.
        </p>

        {/* Form Iscrizione / Newsletter */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4">
          <Input
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="rounded-none bg-background text-sm"
          />
          <Button type="submit" disabled={isLoading} className="rounded-none px-6">
            {isLoading ? "Invio..." : "Avvisami"}
          </Button>
        </form>
      </main>

      {/* Footer minimal */}
      <footer className="text-center text-xs font-light text-muted-foreground">
        &copy; {new Date().getFullYear()} Andrea Del Guasta. Tutti i diritti riservati.
      </footer>
    </div>
  );
};

export default ComingSoon;
