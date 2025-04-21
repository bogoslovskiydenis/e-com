"use client";

import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

// Define product interface
interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice: number | null;
    image: string;
    colors: string[];
    isNew: boolean;
    isSale: boolean;
}

interface ProductCardProps {
    product: Product;
    formatPrice: (price: number) => string;
}

// Color mapping for consistent color display
const colorMap: Record<string, string> = {
    'black': '#000000',
    'white': '#FFFFFF',
    'brown': '#A52A2A',
    'blue': '#0000FF',
    'gray': '#808080',
    'green': '#008000'
};

/**
 * ProductCard component - Displays an individual product with consistent styling
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, formatPrice }) => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Product image and badges */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Product badges */}
                <div style={{ position: 'absolute', top: 0, left: 0, display: 'flex' }}>
                    {product.isNew && (
                        <span style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            textTransform: 'uppercase',
                            backgroundColor: '#000',
                            color: '#fff'
                        }}>
                            NEW
                        </span>
                    )}
                    {product.isSale && (
                        <span style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            textTransform: 'uppercase',
                            backgroundColor: '#e53e3e',
                            color: '#fff',
                            marginLeft: '4px'
                        }}>
                            SALE
                        </span>
                    )}
                </div>

                {/* Action buttons */}
                <div style={{ position: 'absolute', top: '4px', right: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}>
                            <Heart size={16} />
                        </button>
                        <button style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: 'none'
                        }}>
                            <ShoppingBag size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product content */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: '12px 0'
            }}>
                {/* Product title - fixed height */}
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '4px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.3',
                    height: '36px' // Fixed height for 2 lines
                }}>
                    {product.name}
                </h3>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        {formatPrice(product.price)}
                    </p>
                    {product.oldPrice && (
                        <p style={{ color: '#9ca3af', fontSize: '12px', textDecoration: 'line-through' }}>
                            {formatPrice(product.oldPrice)}
                        </p>
                    )}
                </div>

                {/* Color options - fixed height */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', height: '20px' }}>
                    {product.colors.map(color => (
                        <button
                            key={color}
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '1px solid #e5e7eb',
                                cursor: 'pointer',
                                margin: '0 2px',
                                backgroundColor: colorMap[color] || color
                            }}
                            aria-label={`Select ${color} color`}
                        />
                    ))}
                </div>

                {/* Spacer to push button to bottom */}
                <div style={{ flexGrow: 1 }}></div>

                {/* Buy button - always at the bottom */}
                <button style={{
                    backgroundColor: '#000',
                    color: '#fff',
                    width: '100%',
                    padding: '8px 0',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                }}>
                    КУПИТИ
                </button>
            </div>
        </div>
    );
};

export default ProductCard;