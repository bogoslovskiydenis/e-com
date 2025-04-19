import Link from "next/link";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-black text-white mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Про компанию */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Про компанію</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white transition">
                                    Про нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts" className="text-gray-300 hover:text-white transition">
                                    Контакти
                                </Link>
                            </li>
                            <li>
                                <Link href="/stores" className="text-gray-300 hover:text-white transition">
                                    Магазини
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-300 hover:text-white transition">
                                    Блог
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Клиентам */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Клієнтам</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/delivery" className="text-gray-300 hover:text-white transition">
                                    Доставка та оплата
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-300 hover:text-white transition">
                                    Умови повернення
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide" className="text-gray-300 hover:text-white transition">
                                    Розмірна сітка
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-white transition">
                                    Часті запитання
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Каталог */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Наші товари</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/catalog/women" className="text-gray-300 hover:text-white transition">
                                    Жіноча лінія
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog/men" className="text-gray-300 hover:text-white transition">
                                    Чоловіча лінія
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog/accessories" className="text-gray-300 hover:text-white transition">
                                    Аксесуари
                                </Link>
                            </li>
                            <li>
                                <Link href="/sale" className="text-gray-300 hover:text-white transition">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Контакти</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Phone size={16} className="mr-2"/>
                                <a href="tel:+380506584680" className="text-gray-300 hover:text-white transition">
                                    +38 00000
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail size={16} className="mr-2"/>
                                <a href="mailto:info@paradise-store.com"
                                   className="text-gray-300 hover:text-white transition">
                                 email@google.com
                                </a>
                            </li>
                            <li className="mt-4">
                                <div className="flex space-x-4">
                                    <a href="https://instagram.com/paradise_store" target="_blank"
                                       rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                                        <Instagram size={20}/>
                                    </a>
                                    <a href="https://facebook.com/paradise_store" target="_blank"
                                       rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                                        <Facebook size={20}/>
                                    </a>
                                    {/*<a href="https://tiktok.com/@paradise_store" target="_blank"*/}
                                    {/*   rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">*/}
                                    {/*    <Tiktok size={20}/>*/}
                                    {/*</a>*/}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Paradise Store. Всі права захищені.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;