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
// VIDEO FILOSOFIA (Ottimizzato per caricamento velocissimo)
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
    <div className="relative w-full shrink-0 lg:w-[300px] xl:w-[340px] aspect-[9/16] overflow-hidden rounded-2xl shadow-lg group mx-auto bg-black">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
// IMMAGINE SERVIZI (Completa, Reattiva, Zero Tagli)
// ============================================================

export const ServiziImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-border bg-neutral-950 flex items-center justify-center p-2 md:p-4">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
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
              caption=""
            />
          </ContentSection>

          {/* 2. LA NOSTRA FILOSOFIA */}
          <ContentSection
            title="La Nost
