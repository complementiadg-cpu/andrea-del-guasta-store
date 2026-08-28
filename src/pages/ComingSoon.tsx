import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ComingSoon = () => {
  const [email, setEmail] = useState("");

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
    <div className="min-h-screen bg-background flex flex-col justify-between p-8 md:p-12">
      {/* Header / Logo minimal */}
      <header className="flex justify-center">
        <h1 className="font-serif text-2xl uppercase tracking-widest text-foreground">
          Brand Name
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
            className="rounded-none bg-background text-sm"
          />
          <Button type="submit" className="rounded-none px-6">
            Avvisami
          </Button>
        </form>
      </main>

      {/* Footer minimal */}
      <footer className="text-center text-xs font-light text-muted-foreground">
        &copy; {new Date().getFullYear()} Brand Name. Tutti i diritti riservati.
      </footer>
    </div>
  );
};

export default ComingSoon;
