import ProductSlider from "@/app/components/product/ProductSlider";
import InstagramSection from "@/app/components/home/InstagramSection";
import BannerSlider from "@/app/components/home/BannerSlider";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            {/* Главный баннер с New Collection */}
            <BannerSlider />

            {/* Топ продаж */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-bold mb-10">ТОП ПРОДАЖІВ</h2>
                    <ProductSlider />
                    <div className="text-center mt-10">
                        <Link href="/catalog">
                            <button className="bg-black text-white px-10 py-3 hover:bg-gray-800 transition-colors">
                                Всі товари
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SALE секция */}
            <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold mb-10 text-red-600">SALE</h2>
                <ProductSlider />
                <div className="text-center mt-10">
                    <Link href="/sale">
                        <button className="bg-red-600 text-white px-10 py-3 hover:bg-red-700 transition-colors">
                            Всі товари зі знижкою
                        </button>
                    </Link>
                </div>
            </section>

            {/* Instagram секция */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-center text-2xl font-bold mb-6">ПІДПИСУЙСЯ НА INSTAGRAM</h2>
                    <div className="text-center mb-10">
                        <a
                            href="https://instagram.com/paradise_store"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <button className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors">
                                ПІДПИСАТИСЯ
                            </button>
                        </a>
                    </div>
                    <InstagramSection />
                </div>
            </section>
        </div>
    );
}