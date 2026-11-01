import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    navigate('/checkout');
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-card-hover hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image Container */}
      <Link to={`/products/${product.id}`} className="relative block aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-md shadow-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-sm w-fit">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Stock status indicator */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock <= 5 && product.stock > 0 ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-md">
              Only {product.stock} left
            </span>
          ) : product.stock === 0 ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white backdrop-blur-md">
              Out of stock
            </span>
          ) : null}
        </div>
      </Link>

      {/* Product Details Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700">{product.rating || '4.8'}</span>
            <span className="text-slate-400">({product.reviewsCount || 42})</span>
          </div>
        </div>

        {/* Title */}
        <Link
          to={`/products/${product.id}`}
          className="text-sm sm:text-base font-bold text-slate-900 hover:text-brand-600 line-clamp-2 transition-colors mb-2"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg sm:text-xl font-extrabold text-slate-900">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs sm:text-sm text-slate-400 line-through">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart & Buy Now */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:border-brand-600 bg-white hover:bg-brand-50 text-slate-800 hover:text-brand-600 text-xs font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold transition duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Buy Now"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
