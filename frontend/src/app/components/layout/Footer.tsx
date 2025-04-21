"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrap">
                    {/* Про компанію */}
                    <div className="footer__column">
                        <h3>Про компанію</h3>
                        <ul>
                            <li>
                                <Link href="/faq">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    Про нас
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts">
                                    Контакти
                                </Link>
                            </li>
                            <li>
                                <Link href="/stores">
                                    Наші магазини
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog">
                                    Блог
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Каталог */}
                    <div className="footer__column">
                        <h3>Каталог</h3>
                        <ul>
                            <li>
                                <Link href="/catalog/women">
                                    Жіночий верхній одяг
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog/men">
                                    Чоловічий верхній одяг
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog/accessories">
                                    Аксесуари
                                </Link>
                            </li>
                            <li>
                                <Link href="/sale">
                                    Акції та знижки
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog/new">
                                    Нові товари
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Допомога */}
                    <div className="footer__column">
                        <h3>Допомога</h3>
                        <ul>
                            <li>
                                <Link href="/delivery">
                                    Оплата і доставка
                                </Link>
                            </li>
                            <li>
                                <Link href="/guarantee">
                                    Гарантії
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    Договір оферти
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns">
                                    Повернення та обмін
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy">
                                    Політика конфіденційності
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide">
                                    Таблиця розмірів
                                </Link>
                            </li>
                            <li>
                                <Link href="/workshop">
                                    Майстерня
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Наші адреси */}
                    <div className="footer__contacts">
                        <h3>Наші адреси</h3>
                        <div>
                            <p>м. Київ проспект Степана Бандери, 36 ТРЦ Blockbuster Mall</p>
                            <p>з 10 до 22:00</p>
                        </div>
                        <div>
                            <p>м. Київ ТЦ Дарынок</p>
                            <p>з 10 до 20:00</p>
                        </div>

                        <div className="footer__logo">
                            <Image
                                src="/images/logo.svg"
                                alt="Paradise Store"
                                width={180}
                                height={45}
                            />
                            <p>Paradise-Store</p>
                        </div>

                        <div className="footer__contacts-info">
                            <a href="tel:0961446460">
                                📞 096 144-64-60
                            </a>
                            <a href="tel:0674066996">
                                📱 067 406-69-96
                            </a>
                            <a href="mailto:info@paradise-store.com">
                                ✉️ info@paradise-store.com
                            </a>
                        </div>

                        {/* Social media links */}
                        <div className="footer__social">
                            <a href="https://tiktok.com/@paradise_store" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                                </svg>
                            </a>
                            <a href="https://t.me/paradise_store" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 496 512">
                                    <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/>
                                </svg>
                            </a>
                            <a href="https://facebook.com/paradise_store" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 320 512">
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/paradise_store" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Payment methods */}
                <div className="footer__payment">
                    <Image src="/images/visa.svg" alt="Visa" width={40} height={25} />
                    <Image src="/images/mastercard.svg" alt="MasterCard" width={40} height={25} />
                </div>

                {/* Copyright */}
                <div className="footer__copyright">
                    <p>© {new Date().getFullYear()} Paradise Store. Всі права захищені.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;