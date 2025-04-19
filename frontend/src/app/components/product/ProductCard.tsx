"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
import { CartContext } from "@/app/components/Providers";

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: "Стьобане пальто з поясом",
        price: 12500,
        oldPrice: null,
        image: "/images/product-1.jpg",
        colors: ["black", "beige"],
        isNew: true,
        isSale: false,
    },
    {
        id: 2,
        name: "Пальто з вовни преміум класу",
        price: 15900,
        oldPrice: 18900,
        image: "/images/product-1.jpg",
        colors: ["black", "green"],
        isNew: false,
        isSale: true,
    },
    {
        id: 3,
        name: "Стьобана куртка з еко-шкіри",
        price: 8300,
        oldPrice: null,
        image: "/images/product-3.jpg",
        colors: ["black"],
        isNew: true,
        isSale: false,
    },
    {
        id: 4,
        name: "Жіноча сумка з еко-шкіри",
        price: 1990,
        oldPrice: 2450,
        image: "/images/product-1.jpg",
        colors: ["beige", "green"],
        isNew: false,
        isSale: true,
    },
    {
        id: 5,
        name: "Тренч з поясом",
        price: 9800,
        oldPrice: null,
        image: "/images/product-1.jpg",
        colors: ["beige", "black"],
        isNew: true,
        isSale: false,
    },
    {
        id: 6,
        name: "Чоловіче пальто з вовни",
        price: 14500,
        oldPrice: 16950,
        image: "/images/product-1.jpg",
        colors: ["black", "gray"],
        isNew: false,
        isSale: true,
    },
];

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Function to format price
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " грн";
    };

    // Add to cart with the selected color and default size
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: selectedColor,
            size: "M", // Default size
        });
    };

    // Toggle favorite status
    const toggleFavorite = (e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                    {/* Product image */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Product badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="bg-black text-white text-xs px-2 py-1">NEW</span>
                        )}
                        {product.isSale && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1">SALE</span>
                        )}
                    </div>

                    {/* Quick actions (visible on hover) */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-white/90 p-3 flex justify-between items-center transition-transform duration-300 ${
                            isHovered ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        {/* Color options */}
                        <div className="flex gap-1">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedColor(color);
                                    }}
                                    className={`w-6 h-6 rounded-full border ${
                                        selectedColor === color ? "ring-2 ring-black ring-offset-1" : ""
                                    }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select ${color} color`}
                                />
                            ))}
                        </div>

                        {/* Quick actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={toggleFavorite}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-full"
                                aria-label="Add to favorites"
                            >
                                <Heart
                                    size={18}
                                    fill={isFavorite ? "currentColor" : "none"}
                                    className={isFavorite ? "text-red-500" : "text-gray-700"}
                                />
                            </button>

                            <button
                                onClick={handleAddToCart}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-full"
                                aria-label="Add to cart"
                            >
                                <ShoppingBag size={18} className="text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div>
                    <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">
                            {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-xs text-gray-500 line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

const ImprovedProductSlider = ({ title, subtitle, buttonText, buttonLink, filterBySale = false }) => {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Filter products by sale status if needed
    const products = filterBySale
        ? mockProducts.filter(p => p.isSale)
        : mockProducts;

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

    const scroll = (direction) => {
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
        <section className={`py-16 ${filterBySale ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${filterBySale ? 'text-red-600' : ''}`}>
                        {title}
                    </h2>
                    {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>

                <div className="relative">
                    {/* Navigation buttons */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Products container */}
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

                {/* CTA button */}
                <div className="text-center mt-10">
                    <Link href={buttonLink || "/catalog"}>
                        <button className={`px-10 py-3 transition-colors ${
                            filterBySale
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-black hover:bg-gray-800 text-white'
                        }`}>
                            {buttonText || "Всі товари"}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Default export
const ProductSections = () => {
    return (
        <>
            <ImprovedProductSlider
                title="ТОП ПРОДАЖІВ"
                subtitle="Найпопулярніші моделі цього сезону"
                buttonText="Всі товари"
                buttonLink="/catalog"
                filterBySale={false}
            />

            <ImprovedProductSlider
                title="SALE"
                subtitle="Спеціальні пропозиції зі знижками"
                buttonText="Всі товари зі знижкою"
                buttonLink="/sale"
                filterBySale={true}
            />
        </>
    );
};

export default ProductSections;