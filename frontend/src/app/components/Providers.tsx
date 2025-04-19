"use client";

import { ReactNode, createContext, useState } from "react";

// Типы для контекста корзины
interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

// Создаем контекст
export const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    totalItems: 0,
    totalPrice: 0,
});

export const Providers = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Вычисляемые значения
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Функции для работы с корзиной
    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            // Проверяем, есть ли такой товар в корзине
            const existingItem = prev.find(
                i => i.id === item.id && i.color === item.color && i.size === item.size
            );

            if (existingItem) {
                // Если товар уже есть, увеличиваем его количество
                return prev.map(i =>
                    i.id === item.id && i.color === item.color && i.size === item.size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                // Если товара нет, добавляем его с количеством 1
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            items: cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};