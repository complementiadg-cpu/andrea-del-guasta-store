import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import ProductGrid from "../components/category/ProductGrid";

const Collection = () => {
  const { collection } = useParams();
  const name = collection ? decodeURIComponent(collection) : "Collezioni";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <CategoryHeader category={name} />
        <ProductGrid filterCollection={collection ? decodeURIComponent(collection) : undefined} />
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
