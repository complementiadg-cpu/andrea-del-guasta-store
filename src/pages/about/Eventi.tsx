import { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import AboutSidebar from "../../components/about/AboutSidebar";
import { toast } from "@/hooks/use-toast";

const Eventi = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    tipoEvento: "",
    dataEvento: "",
    messaggio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Richiesta consulenza evento — ${form.nome}`);
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nEmail: ${form.email}\nTelefono: ${form.telefono}\nTipo di evento: ${form.tipoEvento}\nData: ${form.dataEvento}\n\nMessaggio:\n${form.messaggio}`
    );
    window.location.href = `mailto:info@andreadelguasta.com?subject=${subject}&body=${body}`;
    toast({
      title: "Richiesta pronta",
      description: "Il tuo client di posta si aprirà con i dati compilati.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>

        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          {/* 1. Hero Section */}
          <PageHeader
            title="ADG Eventi & Wedding Planning"
            subtitle="L'eleganza del design toscano, la cura del dettaglio stilistico, la magia del tuo evento a Firenze."
          />

          <ContentSection>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Dietro ogni grande evento c'è una visione. ADG Eventi nasce dalla
              fusione tra il background stilistico, l'artigianalità fiorentina e
              la passione per il wedding & event planning. Firmati dallo
              stilista e consulente d'immagine Andrea Del Guasta, i nostri
              progetti trasformano desideri, emozioni e idee in scenografie
              vive, eleganti e indimenticabili.
            </p>
          </ContentSection>

          {/* 2. La Nostra Filosofia */}
          <ContentSection title="La Nostra Filosofia">
            <p className="font-serif text-2xl md:text-3xl font-light text-foreground leading-relaxed max-w-3xl mb-8">
              Dall'Idea al Coordinamento Finale: L'Arte di Creare Esperienze
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              Per noi, un matrimonio o un evento privato non è solo
              un'organizzazione logistica, ma una vera e propria creazione
              sartoriale. Dalla consulenza d'immagine per gli sposi e per gli
              ospiti, alla scelta delle location più suggestive nel cuore della
              Toscana, fino agli allestimenti floreali e alle scenografie
              luminose: ogni dettaglio viene studiato per rispecchiare la tua
              personalità e la tua storia.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Il nostro punto di forza è la presenza costante: ti affianchiamo
              dal primo incontro conoscitivo fino alla regia completa del giorno
              dell'evento, coordinando fornitori e tempistiche affinché tu possa
              goderti ogni istante in assoluta serenità.
            </p>
          </ContentSection>

          {/* 3. I Nostri Servizi */}
          <ContentSection title="I Nostri Servizi">
            <div className="space-y-12 max-w-3xl">
              {/* Wedding Planning & Design */}
              <div>
                <h3 className="text-xl font-light text-foreground mb-4">
                  Wedding Planning & Design
                </h3>
                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li className="pl-4 border-l border-border">
                    Creiamo matrimoni su misura in Toscana ed Italia (cerimonie
                    religiose, civili e simboliche all'aperto).
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">Design & Allestimenti Scenografici:</span>{" "}
                    Arredi, luci, floral design, tableau de mariage e décor
                    d'atmosfera.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">Location & Catering:</span>{" "}
                    Ricerca e selezione dei migliori partner enogastronomici e
                    delle dimore più esclusive.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">Consulenza d'Immagine:</span>{" "}
                    Styling e coordinamento per gli abiti degli sposi e il look
                    degli invitati, forte dell'esperienza couture della maison.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">Coordinamento del Giorno del Sì:</span>{" "}
                    Regia completa dell'evento sul campo.
                  </li>
                </ul>
              </div>

              {/* Private & Corporate Events */}
              <div>
                <h3 className="text-xl font-light text-foreground mb-4">
                  Private & Corporate Events
                </h3>
                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li className="pl-4 border-l border-border">
                    Party privati, sfilate di moda, cene di gala e presentazioni
                    aziendali curati nei minimi dettagli.
                  </li>
                  <li className="pl-4 border-l border-border">
                    Concept stilistico e direzione artistica.
                  </li>
                  <li className="pl-4 border-l border-border">
                    Gestione logistica, service audio/luci, intrattenimento
                    musicale e photo booth.
                  </li>
                  <li className="pl-4 border-l border-border">
                    Inviti, grafica personalizzata e bomboniere o gift couture.
                  </li>
                </ul>
              </div>
            </div>
          </ContentSection>

          {/* 4. Perché Scegliere ADG Eventi */}
          <ContentSection title="Perché Scegliere ADG Eventi">
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Visione da Stilista
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Non un semplice planner, ma uno stilista e consulente
                  d'immagine capace di armonizzare colori, forme, luci e tessuti
                  in un unicum coerente ed elegante.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Made in Tuscany
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Una profonda conoscenza del territorio di Firenze e della
                  Toscana, arricchita dalla collaborazione con partner d'eccellenza
                  nel catering, nei fiori e nel light design.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Sartorialità e Unicità
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nessun pacchetto predefinito. Ogni evento è progettato da zero,
                  su misura per il tuo budget, stile e desideri.
                </p>
              </div>
            </div>
          </ContentSection>

          {/* 5. Call to Action / Contatti */}
          <ContentSection title="Iniziamo a Progettare il Tuo Evento">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-6">
              Che tu stia sognando un matrimonio romantico tra le colline
              fiorentine o un evento privato esclusivo, siamo pronti ad
              ascoltare la tua storia e a trasformarla in realtà.
            </p>
            <p className="text-muted-foreground max-w-3xl mb-8">
              Email:{" "}
              <a
                href="mailto:info@andreadelguasta.com"
                className="text-foreground underline decoration-1 underline-offset-4 hover:text-primary transition-colors"
              >
                info@andreadelguasta.com
              </a>
            </p>

            {/* Form di richiesta informazioni */}
            <div className="border border-border p-6 md:p-8 max-w-3xl">
              <h3 className="text-xl font-light text-foreground mb-6">
                Prenota una Consulenza
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-foreground mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-1">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-foreground mb-1">
                      Tipo di evento
                    </label>
                    <select
                      name="tipoEvento"
                      value={form.tipoEvento}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors"
                    >
                      <option value="">Seleziona…</option>
                      <option value="Matrimonio">Matrimonio</option>
                      <option value="Party privato">Party privato</option>
                      <option value="Evento aziendale">Evento aziendale</option>
                      <option value="Sfilata di moda">Sfilata di moda</option>
                      <option value="Cena di gala">Cena di gala</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-light text-foreground mb-1">
                    Data indicativa
                  </label>
                  <input
                    type="date"
                    name="dataEvento"
                    value={form.dataEvento}
                    onChange={handleChange}
                    className="w-full md:w-1/2 border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-foreground mb-1">
                    Messaggio
                  </label>
                  <textarea
                    name="messaggio"
                    rows={4}
                    value={form.messaggio}
                    onChange={handleChange}
                    className="w-full border border-border bg-transparent px-3 py-2 text-sm font-light text-foreground outline-none focus:border-foreground transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-foreground text-background text-sm font-light tracking-wide hover:opacity-90 transition-opacity"
                >
                  Prenota un Incontro
                </button>
              </form>
            </div>
          </ContentSection>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Eventi;
