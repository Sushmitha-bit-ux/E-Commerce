import React from 'react';
import { ShieldCheck, Truck, Award, Sparkles, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
          Our Story & Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-2xl mx-auto leading-tight">
          Crafting Meaningful Goods For Modern Living
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal">
          NOVA LUXE was founded with a singular conviction: that premium design, intentional engineering, and transparent fulfillment should be accessible without unnecessary markups.
        </p>
      </section>

      {/* 2. Visual Story Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
              alt="NOVA LUXE Design Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">Headquarters</span>
              <p className="text-sm font-extrabold">Silicon Valley Innovation Hub & Design Lab</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              From Thoughtful Ideation to Real-Time Fulfillment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every piece in our catalog undergoes rigorous functional evaluation — whether it's acoustic driver calibration in our headphones, organic glaze testing on our stoneware mugs, or stitching durability on our commuter backpacks.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We also believe that waiting for your order shouldn't be a mystery. That's why our proprietary 6-stage order tracking framework keeps you informed every step of the journey — from confirmation to door delivery.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-2xl font-black text-brand-600">50K+</p>
                <p className="text-xs text-slate-500 font-medium">Orders Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-600">99.4%</p>
                <p className="text-xs text-slate-500 font-medium">Satisfaction Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-600">2-Day</p>
                <p className="text-xs text-slate-500 font-medium">Average Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To streamline e-commerce into a joyful, friction-free experience where customers receive genuine, masterfully crafted lifestyle products backed by total transparency and human-first customer service.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To build the world's most trusted direct-to-consumer platform — championing sustainable manufacturing, minimal packaging waste, and empowering independent designers alongside innovative technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-brand-600 text-xs font-bold uppercase tracking-wider block mb-1">Core Pillars</span>
          <h2 className="text-3xl font-black text-slate-900">Why Shop With NOVA LUXE?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Live Stage Tracking</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-time progression through 6 distinct verification and carrier stages.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Quality Certified</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every item is inspected and comes with official manufacturer warranty.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Best Price Guarantee</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We match verified prices on authentic audio and lifestyle hardware.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">24/7 Human Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              No bots. Dedicated team ready to answer your questions via chat or call.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-50 border border-brand-100 space-y-4">
          <h3 className="text-2xl font-black text-slate-900">Ready to Discover Our Collections?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Browse our top-rated audio, apparel, and home essentials with guaranteed free shipping.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm py-3 px-8 rounded-2xl shadow-sm transition"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
