"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const BannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Массив баннеров для слайдера
    const banners = [
        {
            id: 1,
            image: "/images/banner-main.jpg",
            alt: "New Collection Banner",
            link: "/catalog/new"
        },
        {
            id: 2,
            image: "/images/banner-2.jpg",
            alt: "Second Banner",
            link: "/catalog/new"
        },
        {
            id: 3,
            image: "/images/banner-3.jpg",
            alt: "Third Banner",
            link: "/catalog/new"
        }
    ];

    // Автоматическое переключение слайдов
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000); // Переключение каждые 5 секунд

        return () => clearInterval(timer);
    }, [banners.length]);

    // Переключение на предыдущий слайд
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    // Переключение на следующий слайд
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    return (
        <div className="slideshow relative max-w-screen-2xl mx-auto">
            {/* Контейнер для слайдера */}
            <div ref={sliderRef} className="relative h-[350px] w-full overflow-hidden">
                {/* Слайды */}
                <div className="swiper-wrapper">
                    {banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className={`swiper-slide absolute inset-0 transition-opacity duration-500 ${
                                index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <Link href={banner.link} className="slideshow__slide block w-full h-full">
                                <img
                                    src={banner.image}
                                    alt={banner.alt}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Кнопки навигации - теперь с дополнительным отступом от края */}
                <button
                    onClick={prevSlide}
                    className="swiper-button-prev left-8"
                    aria-label="Предыдущий слайд"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="swiper-button-next right-8"
                    aria-label="Следующий слайд"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BannerSlider;