"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryNav = () => {
    const [isFixed, setIsFixed] = useState(false);

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

    return (
        <nav className={`header-bottom ${isFixed ? 'fixed' : ''}`}>
            <div className="container">
                <ul className="menu-main">
                    <li className="menu-main__item">
                        <Link href="/catalog/women" className="menu-main__link">
                            ЖІНОЧА ЛІНІЯ
                        </Link>
                    </li>
                    <li className="menu-main__item">
                        <Link href="/catalog/men" className="menu-main__link">
                            ЧОЛОВІЧА ЛІНІЯ
                        </Link>
                    </li>
                    <li className="menu-main__item">
                        <Link href="/catalog/accessories" className="menu-main__link">
                            АКСЕСУАРИ
                        </Link>
                    </li>
                    <li className="menu-main__item">
                        <Link href="/sale" className="menu-main__link text-red-600">
                            SALE
                        </Link>
                    </li>
                    <li className="menu-main__item">
                        <Link href="/catalog/new" className="menu-main__link">
                            НОВИНКИ
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default CategoryNav;