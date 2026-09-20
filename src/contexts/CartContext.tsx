import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  id: string; // unique line id: sku + custom size
  sku: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  image: string;
  quantity: number;
  customSize?: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number, customSize?: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "linea_cart_v2";

const lineId = (sku: string, customSize?: string) =>
  customSize && customSize.trim() !== "" ? `${sku}__${customSize.trim()}` : sku;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
      return parsed.map((i) => ({ ...i, id: i.id ?? lineId(i.sku, i.customSize) }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, customSize?: string) => {
    const size = customSize && customSize.trim() !== "" ? customSize.trim() : undefined;
    const id = lineId(product.sku, size);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          id,
          sku: product.sku,
          name: product.name,
          category: product.category,
          price: product.price,
          priceLabel: product.priceLabel,
          image: product.image,
          quantity,
          customSize: size,
        },
      ];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return { items, totalItems, subtotal, addToCart, updateQuantity, removeFromCart, clearCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
