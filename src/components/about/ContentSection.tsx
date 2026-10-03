interface ContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  containerClassName?: string;
}

const ContentSection = ({
  title,
  children,
  className = "",
  centered = false,
  containerClassName = "max-w-3xl",
}: ContentSectionProps) => {
  const heading = title ? (
    <h2 className="text-3xl font-light text-foreground mb-8">{title}</h2>
  ) : null;

  if (centered) {
    return (
      <section className={`py-16 ${className}`}>
        <div className={`mx-auto w-full ${containerClassName}`}>
          {heading}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`pr-6 py-16 ${className}`}>
      {heading}
      {children}
    </section>
  );
};

export default ContentSection;
