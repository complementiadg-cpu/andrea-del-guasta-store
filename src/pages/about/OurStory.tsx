import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import ImageTextBlock from "../../components/about/ImageTextBlock";
import AboutSidebar from "../../components/about/AboutSidebar";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          <PageHeader 
            title="My Story" 
            subtitle="A journey of passion, craftsmanship, and timeless elegance"
          />
          
          <ContentSection>
            <ImageTextBlock
              image="https://res.cloudinary.com/cjgxjyub/image/upload/v1785743310/deac642a-2da7-44fd-a263-15a9a5233523-1_all_20232_efp7ec.jpg"
              imageAlt="Andrea Del Guasta Founders"
              title="Una storia che continua"
              content="Ogni creazione Andrea Del Guasta nasce da un'eredità preziosa. Le collezioni prendono vita dalla riscoperta di componenti originali provenienti da un laboratorio di bigiotteria fiorentino attivo negli anni Ottanta, appartenuto a suo cugino Loriano Vignozzi, modista di luxury bijoux di fama internazionale. Anziché lasciarli inutilizzati, Andrea ha scelto di reinterpretarli attraverso un linguaggio contemporaneo, dando nuova vita a un patrimonio di creatività e manifattura."
              imagePosition="left"
            />
          </ContentSection>

          <ContentSection title="Our Heritage">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Artigianalità Locale</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ogni gioiello è progettato e realizzato interamente in Toscana. Dalla lavorazione del metallo alle galvaniche, fino all'assemblaggio finale, ogni fase della produzione è affidata a maestranze locali che custodiscono il sapere e la qualità della tradizione artigianale italiana.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Un Archivio Vivo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Catene, chiusure, componenti decorativi ed elementi vintage diventano il punto di partenza di nuove collezioni. Ogni dettaglio conserva la memoria della propria origine e viene reinterpretato con uno stile contemporaneo, trasformando il passato in una nuova espressione di eleganza.
                </p>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Our Values">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">100% Toscano</h3>
                <p className="text-muted-foreground">
                  Ogni creazione è progettata e realizzata nella filiera industriale di Firenze e Prato, nel cuore di una tradizione manifatturiera riconosciuta in tutto il mondo.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Dal 1980</h3>
                <p className="text-muted-foreground">
                  Un patrimonio di materiali, esperienza e lavorazioni artigianali reinterpretato attraverso una visione contemporanea.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Ogni Gioiello è Unico</h3>
                <p className="text-muted-foreground">
                  Ciò che per molti rappresentava la fine di una storia è diventato l'inizio di una nuova visione. Andrea Del Guasta trasforma un archivio di elementi vintage in collezioni contemporanee, preservando il valore della tradizione e proiettandolo nel presente.
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

export default OurStory;
