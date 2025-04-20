"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ image, title, link }) => {
    return (
        <div className="category-wall__item group">
            <div className="relative overflow-hidden h-[400px]"> {/* Reduced height from 600px to 400px */}
                {/* Background Image */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>

                {/* Content */}
                <div className="category-wall__wrap">
                    <h3 className="category-wall__title mb-6">{title}</h3>
                    <Link href={link}>
                        <span className="category-wall__btn bg-white text-black px-8 py-3 hover:bg-black hover:text-white border border-white transition-colors duration-300">
                            ПЕРЕЙТИ ДО КАТАЛОГУ
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const CategoriesSection = () => {
    const categories = [
        {
            title: "ЖІНОЧА ЛІНІЯ",
            image: "/images/category-women.jpg",
            link: "/catalog/women"
        },
        {
            title: "ЧОЛОВІЧА ЛІНІЯ",
            image: "/images/category-men.jpg",
            link: "/catalog/men"
        },
        {
            title: "АКСЕСУАРИ",
            image: "/images/category-accessories.jpg",
            link: "/catalog/accessories"
        }
    ];

    return (
        <section className="py-10">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added max-width and center alignment */}
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
                    ІНТЕРНЕТ-МАГАЗИН ВЕРХНЬОГО ОДЯГУ PARADISE-STORE
                </h2>
                <div className="category-wall__inner">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            title={category.title}
                            image={category.image}
                            link={category.link}
                        />
                    ))}
                </div>

                {/* About section */}
                <div className="mt-12 max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold mb-6">Про наш магазин</h3>
                    <p className="text-gray-700 mb-4">
                        Paradise Store - це інтернет-магазин верхнього одягу, де Ви знайдете якісні пальта, куртки, тренчі та аксесуари за доступними цінами.
                    </p>
                    <p className="text-gray-700">
                        Ми спеціалізуємося на виробництві стильного верхнього одягу для чоловіків і жінок, дотримуючись найвищих стандартів якості та актуальних модних тенденцій.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;