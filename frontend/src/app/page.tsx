import BannerSlider from "@/app/components/home/BannerSlider";
import ProductSections from "@/app/components/product/ProductCard";
import CategoriesSection from "@/app/components/home/CategoryCard";

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Main banner with New Collection */}
            <div className="w-full max-w-screen-2xl mx-auto">
                <BannerSlider />
            </div>

            {/* Categories section with smaller images */}
            <div className="w-full category-section">
                <CategoriesSection />
            </div>

            {/* Product sections */}
            <div className="w-full">
                <ProductSections />
            </div>
        </div>
    );
}