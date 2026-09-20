import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  immagine?: string;
  category?: string;
  misura_personalizzata?: string;
  customSize?: string;
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Inizializzazione dallo storage locale
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('adg_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Errore nel recupero del carrello da localStorage:", error);
      return [];
    }
  });

  // 2. Salvataggio in localStorage ad ogni modifica
  useEffect(() => {
    try {
      localStorage.setItem('adg_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Errore nel salvataggio del carrello in localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve essere utilizzato all\'interno di un CartProvider');
  }
  return context;
};
