"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/app/components/Providers";

const MainHeader = () => {
    const { totalItems } = useContext(CartContext);

    return (
        <div className="header-middle">
            <div className="container">
                <div className="flex items-center space-x-8">
                    {/* Логотип */}
                    <Link href="/" className="block">
                        <Image
                            src="/images/logo.svg"
                            alt="Paradise Store"
                            width={180}
                            height={45}
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Телефон */}
                    <div className="header-middle__contact">
                        <span className="text-gray-500 text-xs">Передзвоніть нам?</span>
                        <a href="tel:067406-69-96" className="text-blue-600 text-sm hover:text-gray-700 transition-colors">
                            067 406-69-96
                        </a>
                    </div>
                </div>

                {/* Поиск */}
                <div className="search-box-wrapper">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Введіть пошуковий запит"
                            className="search-box__input w-full"
                        />
                        <button className="search-box__btn">
                            <Search className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Иконки */}
                <div className="flex items-center space-x-6">
                    <Link href="/account" className="header-middle__btn">
                        <User size={22} strokeWidth={1.5} />
                    </Link>
                    <Link href="/favorites" className="header-middle__btn relative">
                        <Heart size={22} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            0
                        </span>
                    </Link>
                    <Link href="/cart" className="header-middle__btn relative">
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {totalItems}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;