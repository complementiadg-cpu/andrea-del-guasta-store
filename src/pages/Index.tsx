import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LargeHero from "../components/content/LargeHero";
import FiftyFiftySection from "../components/content/FiftyFiftySection";
import OneThirdTwoThirdsSection from "../components/content/OneThirdTwoThirdsSection";
import EditorialSection from "../components/content/EditorialSection";
import CollectionShowcase from "../components/content/CollectionShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <FiftyFiftySection />
        <CollectionShowcase collection="Stone gender" />

        <LargeHero />
        <CollectionShowcase collection="Pearl" />

        <OneThirdTwoThirdsSection />
        <CollectionShowcase collection="Metal pride" />

        <EditorialSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
