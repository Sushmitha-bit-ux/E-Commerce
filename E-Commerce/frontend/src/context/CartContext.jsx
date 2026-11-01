import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('nova_cart_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Pre-populate with 1 nice item for initial warm experience
    return [
      {
        productId: "prod-1",
        productName: "Aura Pro Wireless Noise-Cancelling Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        price: 249.99,
        quantity: 1,
        stock: 24,
        category: "Electronics"
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState(() => localStorage.getItem('nova_cart_promo') || '');
  const [promoDiscountRate, setPromoDiscountRate] = useState(() => {
    const code = localStorage.getItem('nova_cart_promo');
    if (code === 'SAVE10') return 0.10;
    if (code === 'WELCOME20') return 0.20;
    return 0;
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('nova_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, showDrawer = false) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        addToast(`Updated ${product.name} quantity to ${newQty}`, 'success');
        return prevItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      } else {
        addToast(`Added ${product.name} to cart`, 'success');
        return [
          ...prevItems,
          {
            productId: product.id,
            productName: product.name,
            productImage: product.mainImage,
            price: product.price,
            quantity: quantity,
            stock: product.stock,
            category: product.category
          }
        ];
      }
    });

    if (showDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((x) => x.productId === productId);
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    if (item) {
      addToast(`Removed ${item.productName} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setPromoDiscountRate(0);
    localStorage.removeItem('nova_cart_promo');
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SAVE10') {
      setPromoCode('SAVE10');
      setPromoDiscountRate(0.10);
      localStorage.setItem('nova_cart_promo', 'SAVE10');
      addToast('Promo code SAVE10 applied! 10% discount added.', 'success');
      return true;
    } else if (clean === 'WELCOME20') {
      setPromoCode('WELCOME20');
      setPromoDiscountRate(0.20);
      localStorage.setItem('nova_cart_promo', 'WELCOME20');
      addToast('Promo code WELCOME20 applied! 20% discount added.', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try SAVE10 or WELCOME20', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountRate(0);
    localStorage.removeItem('nova_cart_promo');
    addToast('Promo code removed', 'info');
  };

  // Computations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscountRate;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        promoCode,
        promoDiscountRate,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
