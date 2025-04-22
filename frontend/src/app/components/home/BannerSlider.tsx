"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { register } from 'swiper/element/bundle';

// Register Swiper web components
register();

const BannerSlider = () => {
    const swiperElRef = useRef(null);

    // Banner data
    const banners = [
        {
            id: 1,
            image: "/images/banner-main.jpg",
            alt: "New Collection Banner",
            link: "/catalog/new"
        },
        {
            id: 2,
            image: "/images/banner-2.png",
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

    useEffect(() => {
        // Configure Swiper parameters
        const swiperEl = swiperElRef.current;

        const swiperParams = {
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init() {
                    // ... any initialization code
                },
            },
        };

        // Apply parameters
        Object.assign(swiperEl, swiperParams);

        // Initialize Swiper
        swiperEl.initialize();
    }, []);

    return (
        <div className="slideshow-container max-w-screen-2xl mx-auto relative">
            <swiper-container
                ref={swiperElRef}
                class="relative  w-full overflow-hidden"
            >
                {banners.map((banner) => (
                    <swiper-slide key={banner.id}>
                        <Link href={banner.link} className="block w-full h-full">
                            <img
                                src={banner.image}
                                alt={banner.alt}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                    </swiper-slide>
                ))}

                {/* Swiper navigation buttons */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>

                {/* Optional pagination dots */}
                <div className="swiper-pagination"></div>
            </swiper-container>
        </div>
    );
};

export default BannerSlider;