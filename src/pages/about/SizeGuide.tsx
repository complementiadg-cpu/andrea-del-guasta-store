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
            title="Size Guide" 
            subtitle="Find your perfect fit with our comprehensive sizing guide"
          />
        
          <ContentSection title="Ring Sizing">
            <div className="space-y-8">
              <div className="bg-muted/10 rounded-lg p-8">
                <h3 className="text-xl font-light text-foreground mb-6">How to Measure Your Ring Size</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Method 1: Using a Ring You Own</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Take a ring that fits comfortably on your desired finger</li>
                      <li>Place it on a ruler and measure the inner diameter in millimeters</li>
                      <li>Use our size chart below to find your size</li>
                    </ol>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Method 2: Using String or Paper</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Wrap string or paper around your finger where the ring will sit</li>
                      <li>Mark where the material overlaps</li>
                      <li>Measure the length in millimeters</li>
                      <li>Divide by 3.14 to get the diameter</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/20">
                      <th className="border border-border p-3 text-left font-light">Size</th>
                      <th className="border border-border p-3 text-left font-light">Diameter (mm)</th>
                      <th className="border border-border p-3 text-left font-light">Circumference (mm)</th>
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

          <ContentSection title="Bracelet & Necklace Sizing">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Bracelet Sizes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Taglia unica regolabile</span>
                    <span className="text-foreground">20 - 25 cm</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-light text-foreground">Necklace Lengths</h3>
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
                <h4 className="font-medium text-foreground mb-4">How to Measure your size using string</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Using a piece of string, gently measure the area where your necklace or bracelet will naturally sit.</li>
                  <li>Mark where the material overlaps</li>
                  <li>Measure the length in millimeters</li>
                </ol>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Need Help?">
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
