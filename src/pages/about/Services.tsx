import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import ImageTextBlock from "../../components/about/ImageTextBlock";
import AboutSidebar from "../../components/about/AboutSidebar";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>

        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          <PageHeader
            title="Servizi"
            subtitle="Moda artigianale in Toscana: eccellenza e identità"
          />

          <ContentSection>
            <ImageTextBlock
              image="https://res.cloudinary.com/cjgxjyub/image/upload/v1785743310/deac642a-2da7-44fd-a263-15a9a5233523-1_all_20232_efp7ec.jpg"
              imageAlt="Moda artigianale toscana"
              title="L'amore per la moda artigianale toscana"
              content="L'amore per la moda artigianale toscana, espressione autentica di qualità e unicità, guida ogni mia creazione. La Toscana, e in particolare Firenze, sono da sempre terre di eccellenza nel mondo del fashion: grazie a collaborazioni con artigiani del territorio – dalle piccole pelletterie ai laboratori orafi – ogni progetto prende vita con materiali pregiati, lavorazioni su misura e dettagli che fanno la differenza."
              imagePosition="left"
            />
          </ContentSection>

          <ContentSection title="Oltre le tendenze">
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Dai capi d'abbigliamento agli accessori esclusivi, ogni pezzo che
              disegno è pensato per valorizzare la personalità e lo stile di chi
              lo indossa, andando oltre le tendenze del momento.
            </p>
          </ContentSection>

          <ContentSection title="La mia visione">
            <div className="border-l-2 border-foreground pl-6 py-4 max-w-3xl">
              <p className="font-serif text-2xl md:text-3xl font-light text-foreground leading-relaxed">
                Non seguo la moda ma la interpreto rimanendo fedele a un
                messaggio chiaro:
              </p>
              <p className="font-serif text-2xl md:text-3xl font-light text-foreground leading-relaxed mt-4 italic">
                «Non dipenderò mai dalla moda, ma con la mia libertà creativa ne
                interpreterò il senso, esaltando carattere e unicità.»
              </p>
            </div>
          </ContentSection>

          <ContentSection title="Cosa offro">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Materiali pregiati
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Selezione accurata di materiali di qualità, lavorati con
                  cura da artigiani toscani per garantire durata e bellezza.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Lavorazioni su misura
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ogni progetto nasce su misura, valorizzando la personalità di
                  chi lo indossa con dettagli che fanno la differenza.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Unicità oltre le tendenze
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Creazioni che interpretano la moda con libertà creativa,
                  esaltando carattere e identità invece di inseguire il momento.
                </p>
              </div>
            </div>
          </ContentSection>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
