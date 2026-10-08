import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageHeader from "../../components/about/PageHeader";
import ContentSection from "../../components/about/ContentSection";
import SectionImage from "../../components/about/SectionImage";
import { Volume2, VolumeX } from "lucide-react";

// URL Media
const MEDIA_CAROUSEL = [
  {
    type: "image",
    url: "https://res.cloudinary.com/cjgxjyub/image/upload/v1791473047/magnific__-__41601_ng43ea.png",
    alt: "Scenografia evento ADG 1",
  },
  {
    type: "video",
    url: "https://res.cloudinary.com/cjgxjyub/video/upload/v1791473431/image-to-video/i2v_1b9a7819937b49628491c5ce8a6b9005.mp4",
    alt: "Video evento ADG 1",
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/cjgxjyub/image/upload/v1791473055/magnific__ricrea-la-foto-senza-persone-con-un-angolo-di-inqu__41603_wh02yj.png",
    alt: "Scenografia evento ADG 2",
  },
  {
    type: "video",
    url: "https://res.cloudinary.com/cjgxjyub/video/upload/v1791473185/image-to-video/i2v_09460d195ba945c58dd3283aa9b862a4.mp4",
    alt: "Video evento ADG 2",
  },
  {
    type: "image",
    url: "https://res.cloudinary.com/cjgxjyub/image/upload/v1791473546/magnific__ricrea-la-foto-senza-persone-con-un-angolo-di-inqu__41607_vndwsz.png",
    alt: "Scenografia evento ADG 3",
  },
];

const IMMAGINI = {
  hero: "https://res.cloudinary.com/cjgxjyub/image/upload/v1791473048/events-adg_tigmw1.jpg",
  servizi:
    "https://res.cloudinary.com/cjgxjyub/image/upload/v1791475481/WhatsApp_Image_2026-09-16_at_21.21.08_3_m8zfzk.png",
  perche: "",
  contatti: "",
};

const VIDEO_URL =
  "https://res.cloudinary.com/cjgxjyub/video/upload/f_auto,q_auto/v1791021193/WhatsApp_Video_2026-09-16_at_21.22.06_z2fjli.mp4";

// ============================================================
// CAROSELLO MEDIA (Crossfade fluido & no-stutter video)
// ============================================================

export const CustomMediaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slideTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const SLIDE_DURATION = 3000;
  const FADE_DURATION = 700;

  const goToNextSlide = () => {
    const previousIndex = currentIndex;
    const nextIndex = (currentIndex + 1) % MEDIA_CAROUSEL.length;
    const nextMedia = MEDIA_CAROUSEL[nextIndex];
    const nextVideo = videoRefs.current[nextIndex];

    // Preriscaldiamo e avviamo la riproduzione del video prima di mostrare la slide
    if (nextMedia.type === "video" && nextVideo) {
      nextVideo.currentTime = 0;
      const playPromise = nextVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    setCurrentIndex(nextIndex);

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    // Manteniamo in esecuzione il video precedente finché il crossfade non è terminato
    transitionTimerRef.current = window.setTimeout(() => {
      const previousVideo = videoRefs.current[previousIndex];
      if (previousVideo) {
        previousVideo.pause();
        previousVideo.currentTime = 0;
      }
    }, FADE_DURATION);
  };

  useEffect(() => {
    if (slideTimerRef.current) {
      window.clearTimeout(slideTimerRef.current);
    }

    slideTimerRef.current = window.setTimeout(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (slideTimerRef.current) {
        window.clearTimeout(slideTimerRef.current);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (slideTimerRef.current) {
        window.clearTimeout(slideTimerRef.current);
      }
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    };
  }, []);

  return (
    <div
      className="relative w-full mt-10 aspect-video overflow-hidden rounded-2xl shadow-xl border border-border bg-black"
      style={{ isolation: "isolate" }}
    >
      {MEDIA_CAROUSEL.map((item, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={item.url}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              pointerEvents: isActive ? "auto" : "none",
              willChange: "opacity",
            }}
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover"
                draggable={false}
                loading="eager"
                decoding="async"
              />
            ) : (
              <video
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                src={item.url}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// VIDEO FILOSOFIA
// ============================================================

export const FilosofiaVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full shrink-0 lg:w-[300px] xl:w-[340px] aspect-[9/16] overflow-hidden rounded-2xl shadow-lg group mx-auto">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      <button
        onClick={toggleMute}
        type="button"
        aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
        className="absolute bottom-4 right-4 z-10 p-3 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white rounded-full transition-all duration-300 border border-white/20 shadow-md focus:outline-none"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 stroke-[1.5]" />
        ) : (
          <Volume2 className="w-5 h-5 stroke-[1.5]" />
        )}
      </button>
    </div>
  );
};

// ============================================================
// IMMAGINE CON EFFETTO PARALLASSE (Dal basso verso l'alto)
// ============================================================

export const ParallaxImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const container = containerRef.current;
      const image = imgRef.current;

      if (!container || !image) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progresso visibilità della sezione nello schermo (0 a 1)
      const progress = Math.min(
        1,
        Math.max(
          0,
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );

      const imageHeight = image.offsetHeight;
      const containerHeight = container.offsetHeight;
      const travel = Math.max(0, imageHeight - containerHeight);

      // Parte allineata in basso e sale durante lo scroll verso l'alto
      image.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl border border-border bg-black"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute left-0 bottom-0 w-full h-[130%] max-w-none object-cover will-change-transform"
      />
    </div>
  );
};

// ============================================================
// PAGINA EVENTI
// ============================================================

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numeroWhatsApp = "393299599539";

    const messaggio = `Ciao, vorrei prenotare una consulenza per il mio evento.

Nome: ${form.nome}
Email: ${form.email}
Telefono: ${form.telefono || "Non indicato"}
Tipo di evento: ${form.tipoEvento || "Non indicato"}
Data indicativa: ${form.dataEvento || "Non indicata"}

Messaggio:
${form.messaggio || "Nessun messaggio aggiuntivo."}`;

    const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      messaggio
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <main className="w-full px-6">
          {/* 1. HERO SECTION */}
          <PageHeader
            title="ADG Eventi & Wedding Planning"
            subtitle="L'eleganza del design toscano, la cura del dettaglio stilistico, la magia del tuo evento a Firenze."
            centered
          />

          <ContentSection centered>
            <p className="text-muted-foreground leading-relaxed">
              Dietro ogni grande evento c'è una visione. ADG Eventi nasce
              dalla fusione tra il background stilistico, l'artigianalità
              fiorentina e la passione per il wedding & event planning.
              Firmati dallo stilista e consulente d'immagine Andrea Del
              Guasta, i nostri progetti trasformano desideri, emozioni e idee
              in scenografie vive, eleganti e indimenticabili.
            </p>

            <SectionImage
              image={IMMAGINI.hero}
              alt="Foto di un evento ADG — scenografia e allestimento"
              caption="Scegli la foto da mostrare in questa sezione."
            />
          </ContentSection>

          {/* 2. LA NOSTRA FILOSOFIA */}
          <ContentSection
            title="La Nostra Filosofia"
            centered
            containerClassName="max-w-5xl"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="min-w-0 flex-1 text-left">
                <p className="font-serif text-2xl md:text-3xl font-light text-foreground leading-relaxed mb-8">
                  Dall'Idea al Coordinamento Finale: L'Arte di Creare Esperienze
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Per noi, un matrimonio o un evento privato non è solo
                  un'organizzazione logistica, ma una vera e propria creazione
                  sartoriale. Dalla consulenza d'immagine per gli sposi e per
                  gli ospiti, alla scelta delle location più suggestive nel
                  cuore della Toscana, fino agli allestimenti floreali e alle
                  scenografie luminose: ogni dettaglio viene studiato per
                  rispecchiare la tua personalità e la tua storia.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Il nostro punto di forza è la presenza costante: ti
                  affianchiamo dal primo incontro conoscitivo fino alla regia
                  completa del giorno dell'evento, coordinando fornitori e
                  tempistiche affinché tu possa goderti ogni istante in
                  assoluta serenità.
                </p>
              </div>

              <FilosofiaVideo />
            </div>
          </ContentSection>

          {/* 3. I NOSTRI SERVIZI */}
          <ContentSection title="I Nostri Servizi" centered>
            <div className="space-y-12 text-left mb-12">
              <div>
                <h3 className="text-xl font-light text-foreground mb-4">
                  Wedding Planning & Design
                </h3>

                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li className="pl-4 border-l border-border">
                    Creiamo matrimoni su misura in Toscana ed Italia
                    (cerimonie religiose, civili e simboliche all'aperto).
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">
                      Design & Allestimenti Scenografici:
                    </span>{" "}
                    Arredi, luci, floral design, tableau de mariage e décor
                    d'atmosfera.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">
                      Location & Catering:
                    </span>{" "}
                    Ricerca e selezione dei migliori partner enogastronomici e
                    delle dimore più esclusive.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">
                      Consulenza d'Immagine:
                    </span>{" "}
                    Styling e coordinamento per gli abiti degli sposi e il look
                    degli invitati, forte dell'esperienza couture della maison.
                  </li>
                  <li className="pl-4 border-l border-border">
                    <span className="text-foreground">
                      Coordinamento del Giorno del Sì:
                    </span>{" "}
                    Regia completa dell'evento sul campo.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-light text-foreground mb-4">
                  Private & Corporate Events
                </h3>

                <ul className="space-y-3 text-muted-foreground leading-relaxed">
                  <li className="pl-4 border-l border-border">
                    Party privati, sfilate di moda, cene di gala e
                    presentazioni aziendali curati nei minimi dettagli.
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

            {/* Immagine Servizi in Parallasse */}
            {IMMAGINI.servizi ? (
              <ParallaxImage
                src={IMMAGINI.servizi}
                alt="Foto dei servizi ADG Eventi"
              />
            ) : (
              <SectionImage
                image=""
                alt="Foto dei servizi ADG Eventi"
                caption="Scegli la foto da mostrare in questa sezione."
              />
            )}
          </ContentSection>

          {/* 4. PERCHÉ SCEGLIERE ADG EVENTI */}
          <ContentSection title="Perché Scegliere ADG Eventi" centered>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Visione da Stilista
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Non un semplice planner, ma uno stilista e consulente
                  d'immagine capace di armonizzare colori, forme, luci e
                  tessuti in un unicum coerente ed elegante.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Made in Tuscany
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Una profonda conoscenza del territorio di Firenze e della
                  Toscana, arricchita dalla collaborazione con partner
                  d'eccellenza nel catering, nei fiori e nel light design.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light text-foreground">
                  Sartorialità e Unicità
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nessun pacchetto predefinito. Ogni evento è progettato da
                  zero, su misura per il tuo budget, stile e desideri.
                </p>
              </div>
            </div>

            <CustomMediaCarousel />
          </ContentSection>

          {/* 5. CALL TO ACTION / CONTATTI */}
          <ContentSection
            title="Iniziamo a Progettare il Tuo Evento"
            centered
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Che tu stia sognando un matrimonio romantico tra le colline
              fiorentine o un evento privato esclusivo, siamo pronti ad
              ascoltare la tua storia e a trasformarla in realtà.
            </p>

            <p className="text-muted-foreground mb-8">
              Email:{" "}
              <a
                href="mailto:info@andreadelguasta.com"
                className="text-foreground underline decoration-1 underline-offset-4 hover:text-primary transition-colors"
              >
                info@andreadelguasta.com
              </a>
            </p>

            {/* FORM WHATSAPP */}
            <div className="border border-border p-6 md:p-8 text-left mt-8">
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
