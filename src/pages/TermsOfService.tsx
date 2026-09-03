import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Termini di Servizio - ANDREADELGUASTA";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl uppercase tracking-[0.12em] text-foreground mb-4">Termini di Servizio</h1>
            <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 9 agosto 2026</p>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Venditore</h2>
              <div className="text-muted-foreground leading-relaxed space-y-1">
                <p>ANDREA DEL GUASTA</p>
                <p>Partita IVA 07570330485</p>
                <p>Via Giotto, 1, 50058 Signa (FI), Italia</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@andreadelguasta.com" className="underline hover:text-foreground transition-colors">
                    info@andreadelguasta.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Oggetto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le presenti condizioni disciplinano la vendita a distanza di accessori e gioielli artigianali tramite questo sito. Effettuando un ordine dichiari di accettarle integralmente.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Prodotti e prezzi</h2>
              <p className="text-muted-foreground leading-relaxed">
                I prodotti sono realizzati artigianalmente: lievi variazioni di materiali, colore e finitura rispetto alle immagini sono da considerarsi normali. I prezzi sono espressi in euro e comprensivi delle imposte applicabili. La disponibilità dei prodotti non è garantita fino alla conferma dell'ordine.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Ordini e pagamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                L'ordine si perfeziona con la conferma inviata via email. Il pagamento è dovuto al momento dell'acquisto ed è gestito da fornitori esterni: non conserviamo i dati delle carte. Ci riserviamo il diritto di non accettare ordini in caso di indisponibilità del prodotto o errori evidenti di prezzo.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Spedizioni</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Spedizione standard nazionale gratuita (5 giorni lavorativi)</li>
                <li>Spedizione internazionale 25 €, gratuita per ordini superiori a 300 € (5-10 giorni lavorativi)</li>
                <li>Con misura personalizzata: 10-15 giorni lavorativi in Italia, 15-20 giorni per l'estero</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                I tempi indicati sono stimati e possono variare per cause non imputabili al venditore.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Diritto di recesso e resi</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Il consumatore può recedere entro 14 giorni dal ricevimento dei prodotti, senza obbligo di motivazione, scrivendo a{" "}
                <a href="mailto:info@andreadelguasta.com" className="underline hover:text-foreground transition-colors">
                  info@andreadelguasta.com
                </a>
                . I prodotti devono essere restituiti integri e nella confezione originale; le spese di restituzione sono a carico del cliente.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ai sensi dell'art. 59 del Codice del Consumo, il recesso è escluso per i prodotti realizzati su misura o personalizzati su richiesta del cliente (ad esempio con misura personalizzata).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Garanzia legale</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ai prodotti si applica la garanzia legale di conformità di 2 anni prevista dal Codice del Consumo. La garanzia non copre l'usura normale, l'uso improprio o la mancata osservanza delle indicazioni di cura.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Proprietà intellettuale</h2>
              <p className="text-muted-foreground leading-relaxed">
                Testi, immagini, marchi e contenuti del sito sono di proprietà del venditore e non possono essere riprodotti senza autorizzazione scritta.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il trattamento dei dati personali è descritto nella{" "}
                <a href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Legge applicabile e controversie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il contratto è regolato dalla legge italiana. Per i consumatori è competente il foro del luogo di residenza o domicilio ed è disponibile la piattaforma europea di risoluzione delle controversie online (ODR).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
