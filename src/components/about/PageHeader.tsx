interface PageHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const PageHeader = ({ title, subtitle, centered = false }: PageHeaderProps) => {
  const heading = (
    <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
      {title}
    </h1>
  );

  const sub = subtitle ? (
    <p className="text-lg text-muted-foreground">{subtitle}</p>
  ) : null;

  if (centered) {
    return (
      <header className="py-16 border-b border-border">
        <div className="mx-auto w-full max-w-3xl text-center">
          {heading}
          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="pr-6 py-16 border-b border-border">
      {heading}
      {sub}
    </header>
  );
};

export default PageHeader;
