import BannerSlider from "@/app/components/home/BannerSlider";
import CategoriesSection from "@/app/components/home/CategoryCard";
import ProductSections from "@/app/components/product/ProductCarousel";
import SaleSection from "@/app/components/product/SaleSection";

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Main banner with New Collection */}
            <div className="w-full max-w-screen-2xl mx-auto">
                <BannerSlider />
            </div>

            {/* Categories section */}
            <div className="w-full">
                <CategoriesSection />
            </div>


            {/* Product sections (TOP SALES and SALE) */}
            <ProductSections />

            <SaleSection />
        </div>
    );
}