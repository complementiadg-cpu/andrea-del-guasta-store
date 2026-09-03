import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import AboutSidebar from "../../components/about/AboutSidebar";

const CustomerCare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        <div className="hidden lg:block">
          <AboutSidebar />
        </div>
        
        <main className="w-full lg:w-[70vw] lg:ml-auto px-6">
          <PageHeader 
            title="Servizio Clienti" 
            subtitle="Siamo qui per aiutarti per qualsiasi esigenza sui tuoi gioielli"
          />
        
          <ContentSection title="Informazioni di Contatto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Orari</h3>
                <p className="text-muted-foreground">Lun-Ven: 10:00 - 18:00</p>
                <p className="text-sm text-muted-foreground">Sab: 10:00 - 16:00</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Email</h3>
                <p className="text-muted-foreground">info@andreadelguasta.com</p>
                <p className="text-sm text-muted-foreground">Risposta entro 24 ore</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">Chat Live</h3>
                <a 
                  href="https://wa.me/393299599539" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="rounded-none">
                    Avvia Chat
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground">Disponibile negli orari di apertura</p>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Domande Frequenti">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="shipping" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Quali sono le opzioni e i tempi di spedizione?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Offriamo la spedizione standard nazionale gratuita (5 giorni lavorativi). La spedizione internazionale (5–10 giorni lavorativi) è disponibile al costo di 25,00 €, gratuita per ordini maggiori di 300,00 €.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Qual è la vostra politica di reso e cambio?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Offriamo una politica di reso di 10 giorni per articoli non indossati e nelle condizioni originali. Gli articoli personalizzati e quelli con incisioni sono venduti come vendita definitiva (non restituibili).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sizing" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  È possibile modificare la misura del gioiello dopo l'acquisto?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, offriamo la modifica gratuita della misura prima dell'acquisto: ti basterà compilare la sezione dedicata al momento della selezione dell'articolo o contattare il servizio clienti. Ulteriori modifiche successive saranno disponibili a pagamento. Alcuni modelli non possono essere ridimensionati a causa della loro struttura.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Come dovrei prendermi cura dei miei gioielli ADG?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Conserva i tuoi gioielli separatamente in morbide custodie, evita il contatto con prodotti chimici e cosmetici e puliscili delicatamente con un panno morbido.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ContentSection>

          <ContentSection title="Modulo di Contatto">
            <div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-light text-foreground">Nome</label>
                    <Input className="rounded-none" placeholder="Inserisci il tuo nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-light text-foreground">Cognome</label>
                    <Input className="rounded-none" placeholder="Inserisci il tuo cognome" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">Email</label>
                  <Input type="email" className="rounded-none" placeholder="Inserisci la tua email" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">Numero d'Ordine (Opzionale)</label>
                  <Input className="rounded-none" placeholder="Inserisci il numero d'ordine se applicabile" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-light text-foreground">Come possiamo aiutarti?</label>
                  <Textarea 
                    className="rounded-none min-h-[120px]" 
                    placeholder="Descrivi la tua richiesta in dettaglio"
                  />
                </div>
                
                <Button type="submit" className="w-full rounded-none">
                  Invia Messaggio
                </Button>
              </form>
            </div>
          </ContentSection>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerCare;
