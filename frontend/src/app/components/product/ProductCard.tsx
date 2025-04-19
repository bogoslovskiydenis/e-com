"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    colors: string[];
}

const ProductCard = ({ product }: { product: ProductProps }) => {
    // Функция для форматирования цены
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " грн";
    };

    return (
        <div className="w-full flex-shrink-0">
            <Link href={`/product/${product.id}`}>
                <div className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-3">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <p className="font-semibold text-sm">{formatPrice(product.price)}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;