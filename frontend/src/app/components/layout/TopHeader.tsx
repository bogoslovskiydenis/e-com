import Link from "next/link";

const TopHeader = () => {
    return (
        <div className="bg-black text-white py-2">
            <div className="container">
                <div className="flex justify-between items-center">
                    <ul className="menu-top">
                        <li className="menu-top__item">
                            <Link href="/returns" className="hover:text-gray-300 transition-colors">
                                Повернення та обмін
                            </Link>
                        </li>
                        <li className="menu-top__item">
                            <Link href="/stores" className="hover:text-gray-300 transition-colors">
                                Наші магазини
                            </Link>
                        </li>
                        <li className="menu-top__item">
                            <Link href="/shipping" className="hover:text-gray-300 transition-colors">
                                Оплата і доставка
                            </Link>
                        </li>
                        <li className="menu-top__item">
                            <Link href="/guarantee" className="hover:text-gray-300 transition-colors">
                                Гарантії
                            </Link>
                        </li>
                        <li className="menu-top__item">
                            <Link href="/contacts" className="hover:text-gray-300 transition-colors">
                                Контакти
                            </Link>
                        </li>
                    </ul>
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="flex items-center hover:text-gray-300 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                                <circle cx="8" cy="8" r="7.5" stroke="white"/>
                                <path d="M8 4V8L10.5 10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Вхід
                        </Link>
                        <div className="flex items-center space-x-1">
                            <Link href="/ru" className="hover:text-gray-300 transition-colors">Ru</Link>
                            <span className="text-gray-500">/</span>
                            <Link href="/ua" className="hover:text-gray-300 transition-colors font-medium">Укр</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;