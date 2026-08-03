import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import AboutSidebar from "../../components/about/AboutSidebar";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          <PageHeader 
            title="Guida alle Taglie" 
            subtitle="Trova la misura perfetta con la nostra guida completa alle taglie"
          />
        
          <ContentSection title="Taglie degli Anelli">
            <div className="space-y-8">
              <div className="bg-muted/10 rounded-lg p-8">
                <h3 className="text-xl font-light text-foreground mb-6">Come misurare la taglia del tuo anello</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Metodo 1: Usando un anello in tuo possesso</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Prendi un anello che ti veste comodamente sul dito desiderato</li>
                      <li>Posizionalo su un righello e misura il diametro interno in millimetri</li>
                      <li>Confronta il valore con la tabella delle taglie qui sotto per trovare la tua misura</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Metodo 2: Usando un nastro o uno spago</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Avvolgi lo spago o la striscia di carta attorno al dito dove indosserai l'anello</li>
                      <li>Segna il punto in cui il materiale si sovrappone</li>
                      <li>Misura la lunghezza in millimetri per ottenere la circonferenza</li>
                      <li>Dividi per 3,14 per calcolare il diametro</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/20">
                      <th className="border border-border p-3 text-left font-light">Taglia</th>
                      <th className="border border-border p-3 text-left font-light">Diametro (mm)</th>
                      <th className="border border-border p-3 text-left font-light">Circonferenza (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: "Taglia 1", diameter: "16.0", circumference: "50.2" },
                      { size: "Taglia 2", diameter: "16.8", circumference: "52.8" }
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-muted/10">
                        <td className="border border-border p-3">{row.size}</td>
                        <td className="border border-border p-3">{row.diameter}</td>
                        <td className="border border-border p-3">{row.circumference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Misure di Bracciali e Collane">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Misure Bracciali</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Taglia unica regolabile</span>
                    <span className="text-foreground">20 - 25 cm</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Lunghezze Collane</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Choker</span>
                    <span className="text-foreground">35 - 40 cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Girocollo</span>
                    <span className="text-foreground">40 - 45 cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Collana</span>
                    <span className="text-foreground">&gt; 50 cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Sciarpine / Sautoir</span>
                    <span className="text-foreground">&gt; 120 cm</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Couture Fit , un gioiello su misura per te…">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Per Andrea Del Guasta non esiste una misura standard, ma la misura giusta per te. Ogni gioiello viene realizzato artigianalmente e può essere personalizzato gratuitamente prima della spedizione, adattando lunghezze e proporzioni alle tue esigenze. Come un abito couture, ogni creazione nasce per accompagnare la persona che la indossa, trasformando l'unicità in un'esperienza esclusiva.
              </p>
              
              <div className="bg-muted/10 rounded-lg p-8">
                <h4 className="font-medium text-foreground mb-4">Come misurare la tua taglia con uno spago</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Utilizzando uno spago, misura delicatamente la zona in cui appoggerà naturalmente la collana o il bracciale.</li>
                  <li>Segna il punto in cui il materiale si sovrappone</li>
                  <li>Misura la lunghezza in millimetri</li>
                </ol>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Serve aiuto?">
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Hai ancora dubbi sulla taglia? Siamo qui per aiutarti a trovare la vestibilità perfetta. Contattaci per qualsiasi dubbio o chiarimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/about/customer-care">
                  <Button className="rounded-none">
                    Contatti
                  </Button>
                </a>
              </div>
            </div>
          </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SizeGuide;
