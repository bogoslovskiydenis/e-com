"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Prevent body scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const menuItems = [
        {
            id: 'women',
            label: 'ЖІНКАМ',
            link: '/catalog/women',
            hasSubmenu: true
        },
        {
            id: 'men',
            label: 'ЧОЛОВІКАМ',
            link: '/catalog/men',
            hasSubmenu: true
        },
        {
            id: 'accessories',
            label: 'АКСЕСУАРИ',
            link: '/catalog/accessories',
            hasSubmenu: true
        },
        {
            id: 'sale',
            label: 'SALE',
            link: '/sale',
            hasSubmenu: false,
            isHighlighted: true
        },
        {
            id: 'new',
            label: 'НОВИНКИ',
            link: '/catalog/new',
            hasSubmenu: false
        }
    ];

    // Handle toggle for submenu categories
    const toggleCategory = (id: string) => {
        if (activeCategory === id) {
            setActiveCategory(null);
        } else {
            setActiveCategory(id);
        }
    };

    return (
        <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`mobile-menu-container ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <button
                        onClick={onClose}
                        className="close-button"
                        aria-label="Закрити меню"
                    >
                        <X size={24} />
                    </button>

                    <div className="mobile-logo">
                        <Image
                            src="/images/logo.svg"
                            alt="Paradise Store"
                            width={150}
                            height={38}
                        />
                    </div>

                    <div className="mobile-language-switch">
                        <Link href="/ru" className="language-option">Ru</Link>
                        <span className="language-divider">/</span>
                        <Link href="/uk" className="language-option active">Укр</Link>
                    </div>
                </div>

                <div className="mobile-menu-content">
                    <ul className="mobile-menu-list">
                        {menuItems.map((item) => (
                            <li key={item.id} className="mobile-menu-item">
                                {item.hasSubmenu ? (
                                    <button
                                        className={`mobile-menu-button ${item.isHighlighted ? 'highlighted' : ''}`}
                                        onClick={() => toggleCategory(item.id)}
                                    >
                                        {item.label}
                                        <ChevronRight className={`menu-arrow ${activeCategory === item.id ? 'rotate' : ''}`} size={20} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.link}
                                        className={`mobile-menu-link ${item.isHighlighted ? 'highlighted' : ''}`}
                                        onClick={onClose}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;