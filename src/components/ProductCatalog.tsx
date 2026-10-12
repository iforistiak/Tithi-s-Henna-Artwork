import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product, ProductVariant } from '../types/henna';
import { toBengaliNumber, formatBengaliPrice } from '../utils/bengali';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant) => void;
  onInstantPreOrder: (product: Product, variant: ProductVariant) => void;
  onViewProductDetails: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onInstantPreOrder,
  onViewProductDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Track selected variant per product
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      const popular = p.variants.find((v) => v.isPopular) || p.variants[0];
      if (popular) initial[p.id] = popular.id;
    });
    return initial;
  });

  // Track quick feedback on adding to cart
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'সব প্রোডাক্ট' },
    { id: 'cones', label: 'অর্গানিক কোণ' },
    { id: 'bridal', label: 'ব্রাইডাল স্পেশাল কিট' },
    { id: 'powder_oil', label: 'হেনা পাউডার ও এসেনশিয়াল অয়েল' },
    { id: 'care', label: 'আফটারকেয়ার ও সিল্যান্ট' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleSelectVariant = (productId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleAddToCartWithFeedback = (product: Product, variant: ProductVariant) => {
    onAddToCart(product, variant);
    setAddedToast(`${product.name} (${variant.name}) ব্যাগে যোগ হয়েছে!`);
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Alert */}
        {addedToast && (
          <div className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-50 bg-[#2D5337] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
              Tithi's Henna Artwork · ফ্রেশ কালেকশন
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              মেহেদির বিভিন্ন সাইজ ও অর্গানিক প্রোডাক্টস
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              প্রয়োজন অনুযায়ী মিনি কোণ থেকে শুরু করে ব্রাইডাল বড় প্যাক—পছন্দের সাইজ সিলেক্ট করে ক্যাশ অন ডেলিভারি বা হেতেম খাঁ স্টুডিও থেকে পিক-আপ করুন।
            </p>
          </div>

          {/* Fresh batch note */}
          <div className="text-xs text-stone-600 bg-white border border-stone-200/90 py-2 px-3.5 rounded-lg shrink-0 self-start md:self-auto flex items-center gap-2 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>রাজশাহী স্টুডিওতে প্রতিদিন ফ্রেশ তৈরি · পিক-আপ ও হোম ডেলিভারি</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#7D2935] text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const activeVariantId = selectedVariants[product.id] || product.variants[0]?.id;
            const currentVariant = product.variants.find((v) => v.id === activeVariantId) || product.variants[0];

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Product Image Area */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Rating Tag with Bengali Number */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-800 shadow-2xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{toBengaliNumber(product.rating)}</span>
                    <span className="text-stone-400 font-normal">({toBengaliNumber(product.reviewCount)})</span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => onViewProductDetails(product)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#7D2935] rounded-full shadow-2xs transition-colors cursor-pointer"
                    title="বিস্তারিত দেখুন"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                      {product.subtitle}
                    </p>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#7D2935] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stain Tone & Shelf-life Info */}
                    <div className="mt-3 py-2 px-3 bg-[#FAF8F5] rounded-lg text-xs space-y-1 text-stone-700 border border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">কালার টোন:</span>
                        <span className="font-semibold text-[#7D2935]">{product.stainTone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">সংরক্ষণ:</span>
                        <span className="text-stone-700">{product.shelfLife}</span>
                      </div>
                    </div>
                  </div>

                  {/* Size / Variant Selector (Buttons) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span className="font-medium text-stone-800">সাইজ নির্বাচন করুন:</span>
                      <span className="text-[#7D2935] font-semibold">{currentVariant?.weight}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {product.variants.map((v) => {
                        const isSelected = v.id === currentVariant.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => handleSelectVariant(product.id, v.id)}
                            className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-left transition-all cursor-pointer border ${
                              isSelected
                                ? 'border-[#7D2935] bg-[#7D2935]/5 text-[#7D2935] font-bold shadow-2xs'
                                : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                            }`}
                          >
                            <div className="truncate">{v.name}</div>
                            {/* Bengali currency format */}
                            <div className="text-[10px] text-stone-500 font-semibold">
                              {formatBengaliPrice(v.price)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-2 border-t border-stone-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        {/* Price in Bengali */}
                        <span className="text-2xl font-bold text-stone-900 tracking-tight">
                          {formatBengaliPrice(currentVariant.price)}
                        </span>
                        {currentVariant.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            {formatBengaliPrice(currentVariant.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-emerald-700 font-medium">
                        তাজা ব্যাচ প্রস্তুত
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCartWithFeedback(product, currentVariant)}
                        className="w-full py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-stone-600" />
                        <span>ব্যাগে রাখুন</span>
                      </button>

                      <button
                        onClick={() => onInstantPreOrder(product, currentVariant)}
                        className="w-full py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-[#7D2935] hover:bg-[#5C1D26] text-white transition-colors flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <span>প্রি-অর্ডার</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
