import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/app/components/home/CategoryCard";
import ProductSlider from "@/app/components/product/ProductSlider";
import InstagramSection from "@/app/components/home/InstagramSection";

export default function Home() {
    return (
        <div>
            {/* Главный баннер */}
            <section className="relative">
                <div className="relative h-[70vh] w-full overflow-hidden">
                    <Image
                        src="/images/banner-main.jpg"
                        alt="New Collection"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 flex flex-col justify-center container-custom text-white">
                        <h1 className="text-4xl md:text-6xl font-bold">New Collection</h1>
                        <p className="mt-4 text-xl max-w-md">Тренди 2025 року вже доступні в нашому магазині</p>
                        <Link href="/catalog/new" className="mt-6">
                            <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition">
                                Переглянути
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Категории */}
            <section className="py-16 container-custom">
                <h2 className="text-center text-3xl font-bold mb-10">
                    ІНТЕРНЕТ-МАГАЗИН ВЕРХНЬОГО ОДЯГУ PARADISE STORE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CategoryCard
                        image="/images/category-women.jpg"
                        title="ЖІНОЧА ЛІНІЯ"
                        href="/catalog/women"
                    />
                    <CategoryCard
                        image="/images/category-men.jpg"
                        title="ЧОЛОВІЧА ЛІНІЯ"
                        href="/catalog/men"
                    />
                    <CategoryCard
                        image="/images/category-accessories.jpg"
                        title="АКСЕСУАРИ"
                        href="/catalog/accessories"
                    />
                </div>
            </section>

            {/* Топ продаж */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold mb-8">ТОП ПРОДАЖІВ</h2>
                    <ProductSlider />
                </div>
            </section>

            {/* SALE секция */}
            <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold mb-8">SALE</h2>
                <ProductSlider />
            </section>

            {/* Instagram секция */}
            <section className="py-12">
                <InstagramSection />
            </section>
        </div>
    );
}