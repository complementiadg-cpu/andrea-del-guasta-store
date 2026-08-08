import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  nome: z.string().trim().max(100, "Nome troppo lungo").optional(),
  email: z.string().trim().email("Inserisci un indirizzo email valido").max(255),
});

const Newsletter = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ nome, email });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0].message);
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("Newsletter")
      .insert({ nome: parsed.data.nome || null, email: parsed.data.email });

    if (error) {
      setStatus("error");
      setMessage(
        error.code === "23505" || error.code === "23000" || error.code === "23uniq"
          ? "Questo indirizzo è già iscritto."
          : error.message.includes("duplicate")
            ? "Questo indirizzo è già iscritto."
            : "Iscrizione non riuscita. Riprova più tardi.",
      );
      return;
    }

    setStatus("success");
    setMessage("Grazie. La tua iscrizione è stata registrata.");
    setNome("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6">
        <section className="max-w-2xl mx-auto pt-24 pb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-light text-muted-foreground mb-6">
            couture accessories
          </p>
          <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-[0.12em] text-foreground mb-6">
            Newsletter
          </h1>
          <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
            Iscriviti per ricevere in anteprima le nuove collezioni, i pezzi unici e le storie dietro
            ogni creazione ANDREADELGUASTA.
          </p>
        </section>

        <section className="max-w-xl mx-auto pb-24">
          <div className="border-t border-border pt-12">
            {status === "success" ? (
              <div className="text-center space-y-4">
                <h2 className="font-serif text-2xl uppercase tracking-[0.12em] text-foreground">
                  Iscrizione confermata
                </h2>
                <p className="text-sm font-light text-muted-foreground">{message}</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label htmlFor="nl-nome" className="text-sm font-light text-foreground">
                    Nome (opzionale)
                  </label>
                  <Input
                    id="nl-nome"
                    className="rounded-none"
                    placeholder="Il tuo nome"
                    value={nome}
                    maxLength={100}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="nl-email" className="text-sm font-light text-foreground">
                    Email
                  </label>
                  <Input
                    id="nl-email"
                    type="email"
                    className="rounded-none"
                    placeholder="nome@email.com"
                    value={email}
                    maxLength={255}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-light text-destructive">{message}</p>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-none uppercase tracking-[0.2em] text-xs"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Invio…" : "Iscriviti"}
                </Button>

                <p className="text-xs font-light text-muted-foreground text-center leading-relaxed">
                  Iscrivendoti accetti la nostra{" "}
                  <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                  . Puoi annullare l'iscrizione in qualsiasi momento.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;
