interface SectionVideoProps {
  video?: string;
  poster?: string;
  label?: string;
  hint?: string;
  caption?: string;
  className?: string;
}

const SectionVideo = ({
  video,
  poster,
  label = "Spazio video",
  hint = "Formato verticale 9:16",
  caption,
  className = "",
}: SectionVideoProps) => {
  const hasVideo = Boolean(video && video.trim().length > 0);

  return (
    <figure className={`w-full ${className}`}>
      <div className="relative aspect-[9/16] w-full overflow-hidden border border-border bg-secondary">
        {hasVideo ? (
          <video
            src={video}
            poster={poster || undefined}
            controls
            playsInline
            preload="none"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="h-px w-12 bg-border" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {label}
            </span>
            <span className="max-w-[190px] text-xs font-light text-muted-foreground/80">
              {hint}
            </span>
          </div>
        )}
      </div>
      {hasVideo && caption && (
        <figcaption className="mt-3 text-xs font-light text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default SectionVideo;
