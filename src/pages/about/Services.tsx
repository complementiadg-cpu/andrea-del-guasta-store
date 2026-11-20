import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import ImageTextBlock from "../../components/about/ImageTextBlock";
import { Button } from "../../components/ui/button";

const IMG_BASE = "https://res.cloudinary.com/cjgxjyub/image/upload";
const IMG_PATH =
  "v1795170381/WhatsApp_Image_2026-11-16_at_12.13.51_vg7hsb.jpg";

const atelierImg = (w: number) => `${IMG_BASE}/f_auto,q_auto,w_${w}/${IMG_PATH}`;

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <main className="w-full px-6">
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

          <ContentSection title="Atelier ADG">
            <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <h3 className="text-2xl font-light text-foreground mb-6">
                  L'Atelier: un luogo dedicato al su misura e all'arte
                  dell'evento
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  L'atelier apre le sue porte su appuntamento per accoglierti in
                  uno spazio riservato dove ogni dettaglio prende forma con cura
                  artigianale. All'interno potrai esplorare da vicino le
                  collezioni, scoprire allestimenti e complementi dedicati agli
                  eventi e dare vita a capi su misura progettati intorno alle tue
                  esigenze, guidato nella scelta dei modelli e dei materiali più
                  adatti. Situato in posizione strategica tra Prato e Pistoia,
                  nel cuore di uno dei distretti tessili e artigianali più
                  rinomati d'Italia, l'atelier apre le sue porte per offrirti uno
                  spazio riservato dove ogni dettaglio prende forma.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  Un ambiente intimo e facilmente raggiungibile da tutta la
                  Toscana, pensato per trasformare un'idea o un'occasione
                  speciale in un percorso sartoriale e creativo interamente
                  personalizzato. Contattaci per fissare il tuo incontro
                  riservato.
                </p>
                <div className="mt-10">
                  <Link to="/about/customer-care">
                    <Button className="rounded-none px-10">Prenota</Button>
                  </Link>
                </div>
              </div>

              <div className="order-1 w-full lg:order-2 lg:col-span-7">
                <div className="w-full aspect-[3/2] overflow-hidden">
                  <img
                    src={atelierImg(1200)}
                    srcSet={`${atelierImg(600)} 600w, ${atelierImg(1000)} 1000w, ${atelierImg(1400)} 1400w, ${atelierImg(1800)} 1800w`}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    alt="Atelier ADG"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
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
