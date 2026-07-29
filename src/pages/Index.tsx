import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LargeHero from "../components/content/LargeHero";
import FiftyFiftySection from "../components/content/FiftyFiftySection";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import ProductCarousel from "../components/content/ProductCarousel";
import EditorialSection from "../components/content/EditorialSection";
import ProductGrid from "../components/category/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <FiftyFiftySection />
        <ProductCarousel />
        <LargeHero />
        <section className="w-full px-6 mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center">
            La Collezione
          </h2>
        </section>
        <ProductGrid showCategoryFilters />
        <OneThirdTwoThirdsSection />
        <EditorialSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
