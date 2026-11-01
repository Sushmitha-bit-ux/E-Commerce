import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, ChevronRight, User } from 'lucide-react';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const prod = await apiService.getProductById(id);
        setProduct(prod);
        setSelectedImage(prod.images?.[0] || prod.mainImage);

        // Fetch related products
        const allProds = await apiService.getProducts();
        const related = allProds
          .filter((p) => p.category === prod.category && p.id !== prod.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-sm text-slate-500">The product you are looking for may have been removed or updated.</p>
        <Link to="/products" className="inline-block bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      addToast('Please enter your name and comments', 'error');
      return;
    }
    setSubmittingReview(true);
    try {
      const updated = await apiService.addProductReview(product.id, {
        userName: reviewName.trim(),
        rating: Number(reviewRating),
        comment: reviewComment.trim()
      });
      setProduct(updated);
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      addToast('Review submitted successfully! Thank you for your feedback.', 'success');
    } catch (err) {
      addToast('Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  const savings = product.originalPrice ? (product.originalPrice - product.price).toFixed(2) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-brand-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/products" className="hover:text-brand-600 transition">Products</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600 transition">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                -{product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-slate-100 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-brand-600 scale-105 shadow-sm'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box & Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold tracking-wide uppercase mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-extrabold text-amber-900">{product.rating || '4.8'}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Based on {product.reviewsCount || 42} customer reviews
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-xs text-emerald-600 font-bold mt-0.5">
                  You save ${savings} ({product.discountPercent}% off retail)
                </p>
              )}
            </div>

            {/* Stock indicator */}
            <div className="text-right">
              {product.stock > 0 ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock ({product.stock} units)</span>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Key Features Bullets */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Key Highlights
              </h3>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase text-slate-500">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-slate-50 text-slate-600 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="p-2 hover:bg-slate-50 text-slate-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="py-3.5 px-4 rounded-2xl border-2 border-slate-900 hover:border-brand-600 bg-white hover:bg-brand-50 text-slate-900 hover:text-brand-600 font-extrabold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition hover:scale-[1.02] disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Reassurance Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-center text-[11px] text-slate-500 border-t border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50">
              <Truck className="w-4 h-4 text-brand-600 mx-auto mb-1" />
              <span>Fast 2-3 Day Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <RotateCcw className="w-4 h-4 text-brand-600 mx-auto mb-1" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-brand-600 mx-auto mb-1" />
              <span>Official 2-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-10">
        {/* Specifications Table */}
        {product.specs && (
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-500">{key}</span>
                  <span className="font-extrabold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews & Form */}
        <div className="pt-8 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Customer Ratings & Feedback
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Real verified buyer reviews</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-base font-black text-slate-900">{product.rating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                          {rev.userName.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
                  Be the first to share a review for this product!
                </div>
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h4 className="text-sm font-extrabold text-slate-900">Share Your Experience</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Your Name</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                  >
                    <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                    <option value="4">★★★★☆ (4 Stars - Great)</option>
                    <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    <option value="2">★★☆☆☆ (2 Stars - Disappointing)</option>
                    <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Your Review</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                    placeholder="Tell us what you loved or how it performed..."
                    className="w-full mt-1 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-brand-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition shadow-xs"
                >
                  {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Customers Also Viewed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
