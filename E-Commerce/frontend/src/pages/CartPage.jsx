import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, RotateCcw, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    promoCode,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyPromoCode(inputCode);
    if (success) setInputCode('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our fresh tech, apparel, and lifestyle arrivals.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-lg shadow-brand-500/20 transition hover:scale-105"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review items, apply promo vouchers, and continue to checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item Cards */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-slate-50 shrink-0"
              />

              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                  {item.category || 'General'}
                </span>
                <h3 className="text-base font-bold text-slate-900 truncate mt-1">
                  <Link to={`/products/${item.productId}`} className="hover:text-brand-600 transition">
                    {item.productName}
                  </Link>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Unit Price: ${Number(item.price).toFixed(2)}</p>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1.5 hover:bg-slate-200 text-slate-600 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right sm:self-center shrink-0">
                <span className="text-lg font-black text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-4 flex justify-between items-center text-xs text-slate-500 font-semibold">
            <Link
              to="/products"
              className="text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
            >
              <span>&larr; Continue Shopping</span>
            </Link>
            <div className="flex items-center gap-1 text-emerald-600">
              <Truck className="w-4 h-4" />
              <span>{shippingFee === 0 ? 'Eligible for Free Standard Delivery' : 'Add $' + (50 - subtotal).toFixed(2) + ' more for Free Delivery'}</span>
            </div>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          {/* Pricing Row Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-extrabold text-slate-900">${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <div className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo Code ({promoCode})</span>
                </div>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-bold text-slate-900">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 uppercase font-extrabold">FREE</span>
                ) : (
                  `$${shippingFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-base sm:text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
              <span>Total Amount</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Input Form */}
          <div className="pt-2">
            {promoCode ? (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>{promoCode} applied</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-rose-600 hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Promo code (SAVE10)"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black text-sm py-4 rounded-2xl shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
