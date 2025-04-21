"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";

const ProductSections = () => {
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
                                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        {/* Product image and badges */}
                                        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />

                                            {/* Product badges */}
                                            <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex' }}>
                                                {product.isNew && (
                                                    <span style={{
                                                        backgroundColor: '#000',
                                                        color: '#fff',
                                                        fontSize: '0.75rem',
                                                        padding: '0.25rem 0.5rem'
                                                    }}>
                                                        NEW
                                                    </span>
                                                )}
                                                {product.isSale && (
                                                    <span style={{
                                                        backgroundColor: '#e53e3e',
                                                        color: '#fff',
                                                        fontSize: '0.75rem',
                                                        padding: '0.25rem 0.5rem',
                                                        marginLeft: '0.25rem'
                                                    }}>
                                                        SALE
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}>
                                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                    <button style={{
                                                        width: '2rem',
                                                        height: '2rem',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '9999px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}>
                                                        <Heart size={16} />
                                                    </button>
                                                    <button style={{
                                                        width: '2rem',
                                                        height: '2rem',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '9999px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}>
                                                        <ShoppingBag size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Product content */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            padding: '0.75rem 0'
                                        }}>
                                            {/* Product title - fixed height */}
                                            <h3 style={{
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.25rem',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                lineHeight: '1.25',
                                                height: '2.5rem' // Fixed height for 2 lines
                                            }}>
                                                {product.name}
                                            </h3>

                                            {/* Price */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                                    {formatPrice(product.price)}
                                                </p>
                                                {product.oldPrice && (
                                                    <p style={{ fontSize: '0.75rem', color: '#6b7280', textDecoration: 'line-through' }}>
                                                        {formatPrice(product.oldPrice)}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Color options - fixed height */}
                                            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', height: '20px' }}>
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
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '50%',
                                                                border: '1px solid #e5e7eb',
                                                                cursor: 'pointer',
                                                                margin: '0 2px',
                                                                backgroundColor: colorMap[color] || color
                                                            }}
                                                            aria-label={`Select ${color} color`}
                                                        />
                                                    );
                                                })}
                                            </div>

                                            {/* Spacer to push button to bottom */}
                                            <div style={{ flexGrow: 1 }}></div>

                                            {/* Buy button - always at the bottom */}
                                            <button style={{
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                width: '100%',
                                                padding: '0.5rem 0',
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase'
                                            }}>
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

export default ProductSections;