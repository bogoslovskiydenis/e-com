"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

// Моковые данные для продуктов
const products = [
    {
        id: 1,
        name: "Стьобане пальто з поясом",
        price: 12500,
        image: "/images/product-1.jpg",
        colors: ["black", "beige"],
    },
    {
        id: 2,
        name: "Пальто з вовни преміум класу",
        price: 18900,
        image: "/images/product-1.jpg",
        colors: ["black", "green"],
    },
    {
        id: 3,
        name: "Стьобана куртка з еко-шкіри",
        price: 8300,
        image: "/images/product-1.jpg",
        colors: ["black"],
    },
    {
        id: 4,
        name: "Жіноча сумка з еко-шкіри",
        price: 2450,
        image: "/images/product-1.jpg",
        colors: ["beige", "green"],
    },
    {
        id: 5,
        name: "Тренч з поясом",
        price: 9800,
        image: "/images/product-1.jpg",
        colors: ["beige", "black"],
    },
    {
        id: 6,
        name: "Чоловіче пальто з вовни",
        price: 16950,
        image: "/images/product-1.jpg",
        colors: ["black", "gray"],
    },
];

const ProductSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollable = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        return () => window.removeEventListener('resize', checkScrollable);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const { clientWidth } = sliderRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;

            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            // Check scrollable status after animation
            setTimeout(checkScrollable, 500);
        }
    };

    return (
        <div className="relative">
            {/* Навигационные кнопки слайдера */}
            {canScrollLeft && (
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {canScrollRight && (
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Контейнер для прокрутки */}
            <div
                ref={sliderRef}
                className="flex overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
                onScroll={checkScrollable}
            >
                <div className="flex gap-6">
                    {products.map(product => (
                        <div key={product.id} className="w-64 flex-shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;