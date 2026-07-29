import { useParams, Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductCarousel from "../components/content/ProductCarousel";
import { useProduct } from "@/hooks/useProducts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetail = () => {
  const { productId } = useParams();
  const sku = productId ? decodeURIComponent(productId) : undefined;
  const { data: product, isLoading, error } = useProduct(sku);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6">
          <p className="text-sm font-light text-muted-foreground">Caricamento…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-6 px-6">
          <h1 className="font-serif text-3xl mb-4">Prodotto non trovato</h1>
          <p className="text-sm font-light text-muted-foreground">
            Il gioiello richiesto non è disponibile.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <section className="w-full px-6">
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {product.category && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/category/${encodeURIComponent(product.category.toLowerCase())}`}>
                          {product.category}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery image={product.image} name={product.name} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo product={product} />
            </div>
          </div>
        </section>

        <section className="w-full mt-16 lg:mt-24">
          <div className="mb-4 px-6">
            <h2 className="font-serif text-2xl text-foreground">Potrebbero piacerti</h2>
          </div>
          <ProductCarousel filterCategory={product.category} limit={8} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
