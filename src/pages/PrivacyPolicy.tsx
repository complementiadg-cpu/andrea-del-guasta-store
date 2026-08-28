import { useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - ANDREADELGUASTA";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl uppercase tracking-[0.12em] text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Ultimo aggiornamento: 9 agosto 2026</p>
          </header>

          <div className="max-w-none space-y-10">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Titolare del trattamento</h2>
              <div className="text-muted-foreground leading-relaxed space-y-1">
                <p>ANDREA DEL GUASTA</p>
                <p>Partita IVA 07570330485</p>
                <p>Via Giotto, 1, 50058 Signa (FI), Italia</p>
                <p>
                  Email:{" "}
                  <a href="mailto:complementicouture@gmail.com" className="underline hover:text-foreground transition-colors">
                    complementicouture@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Dati che raccogliamo</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Dati di contatto e spedizione forniti in fase di ordine (nome, cognome, email, telefono, indirizzo)</li>
                <li>Dettagli dell'ordine, incluse eventuali misure personalizzate richieste</li>
                <li>Indirizzo email e nome in caso di iscrizione alla newsletter</li>
                <li>Dati tecnici di navigazione strettamente necessari al funzionamento del sito</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Non trattiamo né conserviamo i dati delle carte di pagamento: il pagamento è gestito da fornitori esterni specializzati.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Finalità e basi giuridiche</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Gestione e spedizione degli ordini e assistenza clienti — esecuzione del contratto (art. 6.1.b GDPR)</li>
                <li>Invio della newsletter — consenso, revocabile in qualsiasi momento (art. 6.1.a GDPR)</li>
                <li>Adempimenti fiscali e contabili — obbligo di legge (art. 6.1.c GDPR)</li>
                <li>Sicurezza e corretto funzionamento del sito — legittimo interesse (art. 6.1.f GDPR)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Conservazione</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati degli ordini sono conservati per il tempo necessario alla gestione del rapporto e per i termini previsti dalla normativa fiscale (10 anni). I dati per la newsletter sono conservati fino alla revoca del consenso.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Destinatari e trasferimenti</h2>
              <p className="text-muted-foreground leading-relaxed">
                I dati possono essere comunicati a fornitori che operano come responsabili del trattamento (hosting e database, servizi di spedizione, fornitori di pagamento). Eventuali trasferimenti extra UE avvengono solo in presenza di adeguate garanzie previste dal GDPR.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">I tuoi diritti</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ai sensi degli artt. 15-22 GDPR puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, oltre alla revoca del consenso. Per farlo scrivi a{" "}
                <a href="mailto:complementicouture@gmail.com" className="underline hover:text-foreground transition-colors">
                  complementicouture@gmail.com
                </a>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Cookie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Il sito utilizza cookie tecnici necessari al funzionamento (ad esempio per il carrello e la memorizzazione delle preferenze di consenso), che non richiedono consenso. Eventuali cookie non necessari vengono attivati solo previo consenso, esprimibile tramite il banner presente sul sito.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">Modifiche</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questa informativa può essere aggiornata; le modifiche rilevanti saranno pubblicate su questa pagina con la relativa data di aggiornamento.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
