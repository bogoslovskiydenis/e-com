import BannerSlider from "@/app/components/home/BannerSlider";
import ProductSections from "@/app/components/product/ProductCard";
import CategoriesSection from "@/app/components/home/CategoryCard";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* Main banner with New Collection - centered with max width */}
            <div className="w-full max-w-screen-2xl mx-auto">
                <BannerSlider />
            </div>

            {/* Categories section with the new Category Wall styling */}
            <div className="w-full">
                <CategoriesSection />
            </div>

            {/* Product sections (includes TOP SALES and SALE sections) */}
            <div className="w-full">
                <ProductSections />
            </div>
        </div>
    );
}