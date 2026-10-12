import React, { useState } from 'react';
import { X, Check, ShoppingBag, ArrowRight, Sparkles, Store } from 'lucide-react';
import { Product, ProductVariant } from '../types/henna';
import { formatBengaliPrice } from '../utils/bengali';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
  onOrder: (product: Product, variant: ProductVariant) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrder,
}) => {
  if (!product) return null;

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.find((v) => v.isPopular)?.id || product.variants[0]?.id
  );
  const [addedToast, setAddedToast] = useState(false);

  const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    onAddToCart(product, currentVariant);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-[#E8DEC4]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DEC4] flex items-center justify-between bg-[#FAF7F2]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7B182B] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tithi's Henna Artwork · পণ্যের বিশদ তথ্য</span>
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-200/50 cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6 bg-white">
          
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] border border-[#E8DEC4] shadow-2xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="sm:col-span-7 space-y-2">
              <p className="text-xs text-stone-500 font-medium">{product.subtitle}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1B1415] leading-snug">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-bold text-[#7B182B]">
                  {formatBengaliPrice(currentVariant.price)}
                </span>
                {currentVariant.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatBengaliPrice(currentVariant.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#194E38] font-bold ml-2">
                  (সাইজ: {currentVariant.weight})
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1 font-normal">
                {product.description}
              </p>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 pt-2 border-t border-[#E8DEC4]/60">
            <p className="text-xs font-bold text-[#1B1415]">সাইজ / ভ্যারিয়েন্ট নির্বাচন করুন:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    v.id === currentVariant.id
                      ? 'border-[#7B182B] bg-[#7B182B]/5 ring-1 ring-[#7B182B]'
                      : 'border-[#E8DEC4] hover:border-stone-300 bg-[#FAF7F2]/50'
                  }`}
                >
                  <p className="text-xs font-semibold text-[#1B1415] truncate">{v.name}</p>
                  <p className="text-[11px] text-stone-500 font-bold">
                    {formatBengaliPrice(v.price)} ({v.weight})
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DEC4] space-y-2">
            <h4 className="text-xs font-bold text-[#1B1415] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7B182B]" />
              <span>১০০% প্রাকৃতিক উপাদানসমূহ:</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs bg-white border border-[#E8DEC4] px-2.5 py-1 rounded-xl text-stone-700 font-semibold shadow-2xs"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Stain Tone & Shelf life */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2]/60 rounded-xl border border-[#E8DEC4]">
              <span className="font-bold text-stone-800 block mb-1">কালার স্টেন গ্যারান্টি:</span>
              <p className="text-stone-600">{product.stainTone}</p>
            </div>
            <div className="p-3 bg-[#FAF7F2]/60 rounded-xl border border-[#E8DEC4]">
              <span className="font-bold text-stone-800 block mb-1">সংরক্ষণ ও শেলফ-লাইফ:</span>
              <p className="text-stone-600">{product.shelfLife}</p>
            </div>
          </div>

          {/* Pickup and Delivery notes */}
          <div className="p-3 bg-[#EDF7F1] rounded-xl border border-[#BCE1CC] text-xs text-[#194E38] flex items-center gap-2 font-medium">
            <Store className="w-4 h-4 text-[#194E38] shrink-0" />
            <span>মহিলা কলেজ রোড, হেতেম খাঁ স্টুডিও থেকে সরাসরি ফ্রি পিক-আপ অথবা হোম ডেলিভারি সুবিধা।</span>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#E8DEC4] flex items-center justify-between gap-3">
            <div className="text-xs text-stone-500 font-medium">
              {addedToast ? (
                <span className="text-[#194E38] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> ব্যাগে যোগ হয়েছে!
                </span>
              ) : (
                <span>স্টকে বিদ্যমান · রাজশাহী ফ্রেশ ব্যাচ</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E8DEC4]"
              >
                <ShoppingBag className="w-4 h-4 text-stone-600" />
                <span>ব্যাগে রাখুন</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOrder(product, currentVariant);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7B182B] via-[#8B1A30] to-[#5A1020] hover:from-[#8B1A30] hover:to-[#681120] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>সরাসরি অর্ডার</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
