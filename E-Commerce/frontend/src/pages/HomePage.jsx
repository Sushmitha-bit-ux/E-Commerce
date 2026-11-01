import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Flame, Clock, Star, CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { apiService } from '../services/api';
import { TESTIMONIALS } from '../data/products';
import { useToast } from '../context/ToastContext';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Flash Sale Countdown State
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts()
        ]);
        setCategories(cats.filter((c) => c.slug !== 'all'));
        setFeaturedProducts(prods.filter((p) => p.isFeatured).slice(0, 4));
        setBestSellers(prods.filter((p) => p.isBestSeller).slice(0, 4));
      } catch (err) {
        console.error('Failed to load home page products', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Welcome to NOVA LUXE! Check your email for your 15% discount code.', 'success');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Decorative background glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen E-Commerce Experience</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
                Elevate Everyday <br />
                <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Living & Sound.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Experience studio-certified acoustics, artisanal home ceramics, and timeless minimal fashion — backed by live transparent 6-stage order tracking.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl flex items-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-105 transition-all duration-200"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/products?category=Electronics"
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-sm py-3.5 px-6 rounded-2xl border border-slate-700/80 backdrop-blur-md transition-all"
                >
                  Explore Tech Deals
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Free Express Delivery over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instant 6-Stage Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Money Back</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Banner Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  alt="Aura Pro Noise-Cancelling Headphones"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Card Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-300">
                      Product Spotlight
                    </span>
                    <h3 className="text-sm font-extrabold">Aura Pro Noise-Cancelling</h3>
                    <p className="text-xs text-slate-300">$249.99 <span className="line-through text-slate-400 ml-1">$329.99</span></p>
                  </div>
                  <Link
                    to="/products/prod-1"
                    className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Browse by Department</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Popular Categories
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>All Departments</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-extrabold text-sm sm:text-base group-hover:text-brand-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-300">{cat.productCount} Items Available</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-brand-600 text-xs font-bold uppercase tracking-wider block mb-1">
              Curated For You
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Explore Full Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. FLASH SALE & SPECIAL OFFERS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 via-indigo-900 to-purple-950 text-white p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-extrabold uppercase">
                <Flame className="w-4 h-4 fill-current text-rose-400" />
                <span>Limited Time Flash Sale</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                Get Up to 25% Off Premium Acoustic & Wearable Audio
              </h2>

              <p className="text-sm text-slate-300 max-w-lg">
                Use code <span className="font-mono font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">SAVE10</span> or <span className="font-mono font-bold text-emerald-300 bg-emerald-400/20 px-2 py-0.5 rounded">WELCOME20</span> during checkout to claim your extra discount.
              </p>

              {/* Countdown Stepper */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 min-w-[58px]">
                  <span className="text-xl sm:text-2xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Hours</span>
                </div>
                <span className="text-xl font-bold text-slate-400">:</span>
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 min-w-[58px]">
                  <span className="text-xl sm:text-2xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Mins</span>
                </div>
                <span className="text-xl font-bold text-slate-400">:</span>
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 min-w-[58px]">
                  <span className="text-xl sm:text-2xl font-black text-rose-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Secs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <Link
                to="/products"
                className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm py-4 px-8 rounded-2xl shadow-xl transition-transform hover:scale-105"
              >
                Claim Offer Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-brand-600 text-xs font-bold uppercase tracking-wider block mb-1">
              Top Customer Choices
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Best-Selling Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-600 text-xs font-bold uppercase tracking-wider block mb-1">
              Verified Shopper Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Loved by 50,000+ Customers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <span className="text-xs text-brand-600 font-semibold">{t.purchasedItem}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SUBSCRIPTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-brand-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              Exclusive Member Perks
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Unlock 15% Off Your First Order
            </h2>
            <p className="text-sm text-indigo-100">
              Join the NOVA LUXE VIP list for private flash sales, back-in-stock alerts, and seasonal curations.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3 px-6 rounded-xl transition shadow-md shrink-0"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
