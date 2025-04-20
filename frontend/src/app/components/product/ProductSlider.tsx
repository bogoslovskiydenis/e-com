"use client";

import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { CartContext } from "@/app/components/Providers";

// Mock product data for TOP SALES
const topSalesProducts = [
    {
        id: 1,
        name: "Чоловіча шкіряна куртка весна-осінь (чорна)",
        price: 12900,
        oldPrice: null,
        image: "/images/product-1.jpg",
        colors: ["black"],
        isNew: true,
        isSale: false,
    },
    {
        id: 2,
        name: "Сумка-півмісяць жіноча шкіряна (чорна)",
        price: 2520,
        oldPrice: 3500,
        image: "/images/product-1.jpg",
        colors: ["black", "white"],
        isNew: true,
        isSale: true,
    },
    {
        id: 3,
        name: "Жіноча шкіряна сумка із клапаном (коричнева)",
        price: 2000,
        oldPrice: 2500,
        image: "/images/product-1.jpg",
        colors: ["brown", "blue", "black"],
        isNew: true,
        isSale: true,
    },
    {
        id: 4,
        name: "Подовжене пальто із кашеміру (біле)",
        price: 15900,
        oldPrice: null,
        image: "/images/product-1.jpg",
        colors: ["white"],
        isNew: true,
        isSale: false,
    },
];

// Mock product data for SALE section
const saleProducts = [
    {
        id: 5,
        name: "Жіноча шкіряна сумка на застібці (сіра)",
        price: 2680,
        oldPrice: 3200,
        image: "/images/product-1.jpg",
        colors: ["gray"],
        isNew: false,
        isSale: true,
    },
    {
        id: 6,
        name: "Жіноча шкіряна сумка на плече (біла)",
        price: 2040,
        oldPrice: 2800,
        image: "/images/product-6.jpg",
        colors: ["white", "green"],
        isNew: false,
        isSale: true,
    },
    {
        id: 7,
        name: "Жіноча шкіряна сумка на ланцюжку (сіра)",
        price: 1760,
        oldPrice: 2200,
        image: "/images/product-7.jpg",
        colors: ["gray"],
        isNew: false,
        isSale: true,
    },
    {
        id: 8,
        name: "Жіноча шкіряна сумка із клапаном (коричнева)",
        price: 2000,
        oldPrice: 2450,
        image: "/images/product-3.jpg",
        colors: ["brown", "blue", "black"],
        isNew: false,
        isSale: true,
    },
];

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
            className="product-card group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-card__inner bg-white p-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                <div className="product-card__image">
                    <Link href={`/product/${product.id}`}>
                        <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                            {/* Product image */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                            />

                            {/* Product badges */}
                            <div className="absolute top-3 left-3 flex">
                                {product.isNew && (
                                    <span className="bg-black text-white text-xs px-3 py-1 font-medium">NEW</span>
                                )}
                                {product.isSale && (
                                    <span className="bg-red-600 text-white text-xs px-3 py-1 ml-2 font-medium">SALE</span>
                                )}
                            </div>

                            {/* Buttons over image - appear on hover */}
                            <div className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="flex gap-2">
                                    <button
                                        onClick={toggleFavorite}
                                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                                    >
                                        <Heart size={18} fill={isFavorite ? "black" : "none"} />
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                                    >
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="product-card__content mt-4">
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium mb-2 line-clamp-2 transition-colors hover:text-blue-600">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                        <p className="font-semibold text-sm">
                            {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-xs text-gray-500 line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                    </div>

                    {/* Color options */}
                    <div className="flex gap-2 mb-4">
                        {product.colors.map(color => {
                            const colorMap = {
                                'black': '#000000',
                                'white': '#FFFFFF',
                                'brown': '#A52A2A',
                                'blue': '#0000FF',
                                'gray': '#808080',
                                'green': '#008000'
                            };

                            return (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-6 h-6 rounded-full border transition-all ${
                                        selectedColor === color ? "ring-2 ring-black ring-offset-1" : ""
                                    }`}
                                    style={{ backgroundColor: colorMap[color] || color }}
                                    aria-label={`Select ${color} color`}
                                />
                            );
                        })}
                    </div>

                    {/* Buy button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-3 text-xs uppercase font-medium hover:bg-gray-800 transition-colors rounded-sm"
                    >
                        Купити
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductCarousel = ({ title, products, isRed = false }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const maxSlide = Math.max(0, products.length - 4); // Show 4 products at a time

    // Touch scrolling support
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handlePrev = () => {
        setCurrentSlide(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
    };

    // For horizontal scrolling with touchpad and touch devices
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        sliderRef.current.scrollLeft = scrollLeft - walk;

        // Update currentSlide based on scroll position
        const slideWidth = sliderRef.current.clientWidth / 4;
        const newSlide = Math.round(sliderRef.current.scrollLeft / slideWidth);
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide <= maxSlide) {
            setCurrentSlide(newSlide);
        }
    };

    // Update scrollLeft when currentSlide changes
    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.clientWidth / 4;
            sliderRef.current.scrollLeft = currentSlide * slideWidth;
        }
    }, [currentSlide]);

    return (
        <section className="products-carousel py-12">
            <div className="container">
                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-2xl font-bold ${isRed ? 'text-red-600' : ''}`}>{title}</h2>

                    {/* Navigation arrows in header */}
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={handlePrev}
                            className={`w-10 h-10 flex items-center justify-center border rounded-full hover:border-gray-400 transition-colors ${
                                currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            disabled={currentSlide === 0}
                            aria-label="Previous products"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className={`w-10 h-10 flex items-center justify-center border rounded-full hover:border-gray-400 transition-colors ${
                                currentSlide >= maxSlide ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            disabled={currentSlide >= maxSlide}
                            aria-label="Next products"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {/* Products container - with touchpad support */}
                    <div
                        className="overflow-hidden"
                        ref={sliderRef}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onMouseMove={onMouseMove}
                        style={{
                            cursor: isDragging ? 'grabbing' : 'grab',
                            userSelect: 'none'
                        }}
                    >
                        <div
                            className="flex gap-6 transition-transform duration-300"
                            style={{
                                transform: `translateX(-${currentSlide * (25 + 1.5)}%)`,
                                paddingBottom: '10px' // Room for shadow on hover
                            }}
                        >
                            {products.map(product => (
                                <div key={product.id} className="w-1/4 flex-shrink-0">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentSlide === index ? 'bg-black w-4' : 'bg-gray-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Default export
const ProductSections = () => {
    return (
        <>
            <ProductCarousel
                title="ТОП ПРОДАЖІВ"
                products={topSalesProducts}
            />

            <ProductCarousel
                title="SALE"
                products={saleProducts}
                isRed={true}
            />
        </>
    );
};

export default ProductSections;