"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";

const ProductCarousel = () => {
    // Sample product data
    const products = [
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
            isNew: false,
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
            image: "/images/product-1.jpg",
            colors: ["white", "green"],
            isNew: false,
            isSale: true,
        },
    ];

    const sliderRef = useRef(null);
    const [position, setPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [maxPosition, setMaxPosition] = useState(0);

    // Initialize slide width and max position
    useEffect(() => {
        const updateDimensions = () => {
            if (sliderRef.current) {
                const containerWidth = sliderRef.current.clientWidth;
                const itemsPerView = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
                const newSlideWidth = containerWidth / itemsPerView;
                setSlideWidth(newSlideWidth);

                // Calculate maximum slide position
                const maxPos = Math.max(0, products.length - itemsPerView);
                setMaxPosition(maxPos);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [products.length]);

    // Add wheel event handler for mousewheel/touchpad scrolling
    const handleWheel = (e) => {
        // Prevent default scrolling behavior to avoid page scrolling
        e.preventDefault();

        // Create accumulator for smooth scrolling
        if (!sliderRef.current.wheelDelta) {
            sliderRef.current.wheelDelta = 0;
        }

        // Add to accumulator
        sliderRef.current.wheelDelta += e.deltaY;

        // Define threshold for slide change (adjust as needed for sensitivity)
        const threshold = 100;

        // Check if accumulated delta is enough to change slide
        if (Math.abs(sliderRef.current.wheelDelta) >= threshold) {
            if (sliderRef.current.wheelDelta > 0) {
                goToNextSlide();
            } else {
                goToPrevSlide();
            }

            // Reset accumulator after changing slide
            sliderRef.current.wheelDelta = 0;
        }
    };

    // Add wheel event listener for horizontal scrolling
    useEffect(() => {
        const sliderElement = document.querySelector('.product-slider-container');
        if (sliderElement) {
            // Use passive: false to be able to prevent default
            sliderElement.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                sliderElement.removeEventListener('wheel', handleWheel);
            };
        }
    }, [position, maxPosition, slideWidth]);

    // Touch and mouse event handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentTranslate(-position * slideWidth);

        // Remove transition during dragging for responsiveness
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentTranslate(-position * slideWidth);

        // Remove transition during dragging for responsiveness
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const newTranslate = currentTranslate + diff;

        // Apply limits to prevent excessive dragging
        if (newTranslate <= 0 && newTranslate >= -maxPosition * slideWidth) {
            sliderRef.current.style.transform = `translateX(${newTranslate}px)`;
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        const newTranslate = currentTranslate + diff;

        // Apply limits to prevent excessive dragging
        if (newTranslate <= 0 && newTranslate >= -maxPosition * slideWidth) {
            sliderRef.current.style.transform = `translateX(${newTranslate}px)`;
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        // Add transition back for smooth sliding
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'transform 0.3s ease-out';
        }

        const moveOffset = currentTranslate - (sliderRef.current.style.transform
            ? parseInt(sliderRef.current.style.transform.replace('translateX(', '').replace('px)', ''), 10)
            : 0);

        // Determine if user swiped enough to change slide
        if (Math.abs(moveOffset) > slideWidth * 0.15) { // Reduced threshold for easier swiping
            if (moveOffset > 0) {
                goToPrevSlide();
            } else {
                goToNextSlide();
            }
        } else {
            // If not swiped enough, go back to current position
            sliderRef.current.style.transform = `translateX(${-position * slideWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        handleTouchEnd();
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleTouchEnd();
        }
    };

    // Navigation functions with smooth animation
    const goToPrevSlide = () => {
        if (position > 0) {
            const newPosition = position - 1;
            setPosition(newPosition);

            // Add smooth animation
            if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 0.3s ease-out';
                sliderRef.current.style.transform = `translateX(${-newPosition * slideWidth}px)`;
            }
        }
    };

    const goToNextSlide = () => {
        if (position < maxPosition) {
            const newPosition = position + 1;
            setPosition(newPosition);

            // Add smooth animation
            if (sliderRef.current) {
                sliderRef.current.style.transition = 'transform 0.3s ease-out';
                sliderRef.current.style.transform = `translateX(${-newPosition * slideWidth}px)`;
            }
        }
    };

    // Format price function
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " грн";
    };

    // CSS Styles
    const styles = {
        productCarousel: {
            padding: '48px 0',
        },
        moduleBoxHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '0 0 30px',
            minHeight: '44px',
        },
        navigationButton: {
            position: 'absolute',
            top: '40%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 0,
            padding: 0,
            margin: 0,
            width: '44px',
            height: '44px',
            backgroundColor: '#f5f5f5',
            transform: 'translate(0, -50%)',
            cursor: 'pointer',
        },
        navigationButtonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
        prevButton: {
            left: '0px',
        },
        nextButton: {
            right: '0px',
        },
        sliderContainer: {
            overflow: 'hidden',
            margin: '0 50px',
        },
        slider: {
            display: 'flex',
            transition: 'transform 0.3s ease-out',
            gap: '20px',
        },
    };

    return (
        <div className="products-carousel" style={styles.productCarousel}>
            <div className="container">
                <div className="module-box__header" style={styles.moduleBoxHeader}>
                    <h2 className="text-2xl font-bold">ТОП ПРОДАЖІВ</h2>
                </div>

                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        onClick={goToPrevSlide}
                        className="swiper-button-prev"
                        style={{
                            ...styles.navigationButton,
                            ...styles.prevButton,
                            ...(position === 0 ? styles.navigationButtonDisabled : {})
                        }}
                        disabled={position === 0}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Products slider */}
                    <div
                        className="product-slider-container"
                        style={styles.sliderContainer}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={sliderRef}
                            className="swiper-wrapper"
                            style={styles.slider}
                        >
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="product-card flex-shrink-0"
                                    style={{ width: `calc((100% - 60px) / 4)` }}
                                >
                                    <div className="product-card__inner">
                                        <div className="product-card__image">
                                            <div className="relative aspect-[3/4] overflow-hidden">
                                                {/* Product image */}
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Product badges */}
                                                <div className="absolute top-0 left-0 flex">
                                                    {product.isNew && (
                                                        <span className="bg-black text-white text-xs px-2 py-1">NEW</span>
                                                    )}
                                                    {product.isSale && (
                                                        <span className="bg-red-600 text-white text-xs px-2 py-1 ml-1">SALE</span>
                                                    )}
                                                </div>

                                                {/* Action buttons */}
                                                <div className="absolute top-1 right-1">
                                                    <div className="flex gap-1">
                                                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                            <Heart size={16} />
                                                        </button>
                                                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                            <ShoppingBag size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-card__content mt-3">
                                            <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>

                                            <div className="flex items-center gap-2 mb-2">
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
                                            <div className="flex gap-1 mb-3">
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
                                                            style={{
                                                                backgroundColor: colorMap[color] || color,
                                                                width: '30px',
                                                                height: '30px',
                                                                borderRadius: '20px'
                                                            }}
                                                            aria-label={`Select ${color} color`}
                                                        />
                                                    );
                                                })}
                                            </div>


                                            {/* Buy button */}
                                            <button className="w-full bg-black text-white py-2 text-xs uppercase">
                                                Купити
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={goToNextSlide}
                        className="swiper-button-next"
                        style={{
                            ...styles.navigationButton,
                            ...styles.nextButton,
                            ...(position >= maxPosition ? styles.navigationButtonDisabled : {})
                        }}
                        disabled={position >= maxPosition}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;