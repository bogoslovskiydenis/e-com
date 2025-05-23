"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";

const CategoryNav = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle fixed header on scroll
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header-bottom');
            if (!header) return;

            const headerPosition = header.getBoundingClientRect().top;

            if (headerPosition <= 0 && !isFixed) {
                setIsFixed(true);
                document.body.style.paddingTop = `62px`; // height of header-bottom
            } else if (headerPosition > 0 && isFixed) {
                setIsFixed(false);
                document.body.style.paddingTop = '0';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.paddingTop = '0';
        };
    }, [isFixed]);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenCategory(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Menu data
    const menuData = {
        "ЖІНОЧА ЛІНІЯ": {
            link: "/catalog/women",
            categories: [
                {
                    title: "КУРТКИ",
                    items: [
                        { name: "Альпака", link: "/catalog/women/jackets/alpaca" },
                        { name: "Бомбер", link: "/catalog/women/jackets/bomber" },
                        { name: "Вітовка", link: "/catalog/women/jackets/windbreaker" },
                        { name: "Весна-осінь", link: "/catalog/women/jackets/spring-autumn" },
                        { name: "Демісезон", link: "/catalog/women/jackets/demi-season" },
                        { name: "Джинс", link: "/catalog/women/jackets/denim" },
                        { name: "З утеплом", link: "/catalog/women/jackets/insulated" },
                        { name: "Зима", link: "/catalog/women/jackets/winter" },
                        { name: "Кашемір", link: "/catalog/women/jackets/cashmere" },
                        { name: "Класика", link: "/catalog/women/jackets/classic" },
                        { name: "Класичний", link: "/catalog/women/jackets/classic-style" },
                        { name: "Косуха", link: "/catalog/women/jackets/biker" },
                        { name: "Неплон", link: "/catalog/women/jackets/nylon" },
                        { name: "Пуховик", link: "/catalog/women/jackets/puffer" },
                        { name: "Сорочки", link: "/catalog/women/jackets/shirts" },
                        { name: "Шкіра", link: "/catalog/women/jackets/leather" },
                    ]
                },
                {
                    title: "ПАЛЬТО",
                    items: [
                        { name: "Альпака", link: "/catalog/women/coats/alpaca" },
                        { name: "Весна-осінь", link: "/catalog/women/coats/spring-autumn" },
                        { name: "Вовна", link: "/catalog/women/coats/wool" },
                        { name: "Демісезон", link: "/catalog/women/coats/demi-season" },
                        { name: "З утеплом", link: "/catalog/women/coats/insulated" },
                        { name: "Зима", link: "/catalog/women/coats/winter" },
                        { name: "Кашемір", link: "/catalog/women/coats/cashmere" },
                        { name: "Котон", link: "/catalog/women/coats/cotton" },
                        { name: "Неплон", link: "/catalog/women/coats/nylon" },
                        { name: "Текстиль", link: "/catalog/women/coats/textile" },
                    ]
                },
                {
                    title: "ПУХОВИКИ",
                    items: [
                        { name: "Демісезон", link: "/catalog/women/puffer/demi-season" },
                        { name: "Еко наповнювач", link: "/catalog/women/puffer/eco-filling" },
                        { name: "Біо-наповнювач", link: "/catalog/women/puffer/bio-filling" },
                        { name: "З утеплом", link: "/catalog/women/puffer/insulated" },
                        { name: "Зима", link: "/catalog/women/puffer/winter" },
                        { name: "Пух-перо", link: "/catalog/women/puffer/down-feather" },
                        { name: "Шкіра", link: "/catalog/women/puffer/leather" },
                    ]
                },
                {
                    title: "ШУБИ",
                    items: [
                        { name: "Вовна", link: "/catalog/women/fur/wool" },
                        { name: "З капюшоном", link: "/catalog/women/fur/hooded" },
                        { name: "Натуральне хутро", link: "/catalog/women/fur/natural" },
                        { name: "Норка", link: "/catalog/women/fur/mink" },
                        { name: "Овчина", link: "/catalog/women/fur/sheepskin" },
                        { name: "Хутро", link: "/catalog/women/fur/fur" },
                    ]
                }
            ]
        },
        "ЧОЛОВІЧА ЛІНІЯ": {
            link: "/catalog/men",
            categories: [
                {
                    title: "ПАЛЬТО",
                    items: [
                        { name: "Альпака", link: "/catalog/men/coats/alpaca" },
                        { name: "Весна-осінь", link: "/catalog/men/coats/spring-autumn" },
                        { name: "Вовна", link: "/catalog/men/coats/wool" },
                        { name: "Демісезон", link: "/catalog/men/coats/demi-season" },
                        { name: "З утеплом", link: "/catalog/men/coats/insulated" },
                        { name: "Зима", link: "/catalog/men/coats/winter" },
                        { name: "Кашемір", link: "/catalog/men/coats/cashmere" },
                        { name: "Котон", link: "/catalog/men/coats/cotton" },
                        { name: "Неплон", link: "/catalog/men/coats/nylon" },
                        { name: "Текстиль", link: "/catalog/men/coats/textile" },
                    ]
                },
                {
                    title: "ПУХОВИКИ",
                    items: [
                        { name: "Демісезон", link: "/catalog/men/puffer/demi-season" },
                        { name: "Еко наповнювач", link: "/catalog/men/puffer/eco-filling" },
                        { name: "Зима", link: "/catalog/men/puffer/winter" },
                        { name: "Пух-перо", link: "/catalog/men/puffer/down-feather" },
                    ]
                }
            ]
        },
        "АКСЕСУАРИ": {
            link: "/catalog/accessories",
            categories: []
        },
        "SALE": {
            link: "/sale",
            categories: []
        },
        "НОВИНКИ": {
            link: "/catalog/new",
            categories: []
        }
    };

    return (
        <div ref={menuRef} className={`header-bottom ${isFixed ? 'fixed' : ''}`}>
            <div className="container">
                {/* Mobile menu button */}
                <button
                    type="button"
                    className="lg:hidden absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Menu className="h-6 w-6" />
                </button>

                <ul className="menu-main">
                    {Object.entries(menuData).map(([category, data], index) => (
                        <li
                            key={index}
                            className="menu-main__item"
                            onMouseEnter={() => data.categories.length > 0 && setOpenCategory(category)}
                        >
                            <Link
                                href={data.link}
                                className={`menu-main__link ${category === 'SALE' ? 'text-red-600' : ''}`}
                            >
                                {category}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dropdown menu */}
            {openCategory && menuData[openCategory]?.categories.length > 0 && (
                <div className="simple-dropdown-menu">
                    <div className="simple-dropdown-content">
                        {menuData[openCategory].categories.map((category, idx) => (
                            <div key={idx} className="category-column">
                                <h3 className="category-title">{category.title}</h3>
                                <ul className="category-list">
                                    {category.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>
                                            <Link
                                                href={item.link}
                                                className="category-link"
                                                onClick={() => setOpenCategory(null)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryNav;