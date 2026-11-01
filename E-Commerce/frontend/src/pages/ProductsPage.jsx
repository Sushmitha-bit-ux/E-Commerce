import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, X, Grid3X3, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { apiService } from '../services/api';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(350);
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts()
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.name?.toLowerCase().includes(q);
          const matchesDesc = p.description?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc) return false;
        }

        // Category filter
        if (selectedCategory && selectedCategory !== 'All') {
          if (p.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Price range
        if (p.price > priceRange) return false;

        // In Stock
        if (inStockOnly && p.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // Default Popularity
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [products, searchQuery, selectedCategory, priceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(350);
    setSortBy('popular');
    setInStockOnly(false);
    setSearchParams({});
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    if (catName === 'All') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('category');
      setSearchParams(newParams);
    } else {
      setSearchParams({ category: catName });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Explore All Products
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse our handpicked inventory with verified real-time stock and expedited delivery.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audio, sneakers, bags..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Controls & Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Left Filter Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <span>Filters & Refinements</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter Pills / List */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Categories
              </label>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`text-left px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        selectedCategory.toLowerCase() === cat.name.toLowerCase()
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.productCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Max Price
                </label>
                <span className="text-sm font-extrabold text-slate-900">
                  ${priceRange}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="350"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$30</span>
                <span>$350+</span>
              </div>
            </div>

            {/* In-Stock Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4 accent-brand-600"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-xs sm:text-sm font-semibold text-slate-600">
              Showing <span className="font-extrabold text-slate-900">{filteredProducts.length}</span> results
              {selectedCategory !== 'All' && <span> in <span className="text-brand-600 font-bold">{selectedCategory}</span></span>}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold py-1.5 px-3 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer text-xs"
              >
                <option value="popular">Popularity & Top Reviews</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                We couldn't find any items matching your current search or filter combination. Try clearing some filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
