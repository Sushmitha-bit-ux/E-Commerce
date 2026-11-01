import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Thank you for subscribing! Check your inbox for 15% off.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-11 h-11 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Payments</h4>
              <p className="text-xs text-slate-400">256-Bit SSL Encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Hassle Free</h4>
              <p className="text-xs text-slate-400">Full money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
              <p className="text-xs text-slate-400">24/7 human customer care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                NOVA<span className="text-brand-500">LUXE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              A modern lifestyle and electronics boutique delivering high-precision audio, minimalist apparel, and artisan living goods directly to your door with real-time tracking.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>100 Innovation Parkway, Suite 400, Silicon Valley, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>concierge@novaluxe.store</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400" />
                <span>+1 (800) 555-NOVA (6682)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="hover:text-white transition">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Fashion" className="hover:text-white transition">Fashion</Link>
              </li>
              <li>
                <Link to="/products?category=Home+%26+Living" className="hover:text-white transition">Home & Living</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/orders" className="hover:text-white transition">Order Tracking</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Our Brand</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Help & Contact</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">Account Login</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Stay in the Loop</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Subscribe to unlock private sales, member-only drops, and 15% off your first checkout.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Subscribe for 15% Off</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()} NOVA LUXE E-Commerce Inc. Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          <span>for discerning shoppers.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span>&bull;</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span>&bull;</span>
          <span className="hover:text-slate-300 cursor-pointer">Cookie Preferences</span>
        </div>
      </div>
    </footer>
  );
};
