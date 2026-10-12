import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Store } from 'lucide-react';
import { CartItem } from '../types/henna';
import { toBengaliNumber, formatBengaliPrice } from '../utils/bengali';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  discountAmount,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState(couponCode || '');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput.trim().toUpperCase());
    if (ok) {
      setCouponMessage({ text: '১০% ছাড় কুপন সফলভাবে যুক্ত হয়েছে!', success: true });
    } else {
      setCouponMessage({ text: 'ভুল বা মেয়াদোত্তীর্ণ কুপন। ORGANIC10 চেষ্টা করুন।', success: false });
    }
    setTimeout(() => {
      setCouponMessage(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DEC4] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7B182B]" />
              <h3 className="font-bold text-[#1B1415] text-base">আপনার শপিং ব্যাগ</h3>
              <span className="text-xs bg-[#FDF2F4] text-[#7B182B] border border-[#F5C2CB] px-2.5 py-0.5 rounded-full font-bold">
                {toBengaliNumber(items.reduce((s, i) => s + i.quantity, 0))} টি
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#E8DEC4] flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8 text-[#7B182B]/40" />
                </div>
                <p className="font-bold text-stone-800 text-base">আপনার ব্যাগ বর্তমানে খালি</p>
                <p className="text-xs text-stone-500 max-w-xs font-normal">
                  পছন্দের সাইজের খাঁটি অর্গানিক কোণ বা হেনা প্রোডাক্ট কার্টে যুক্ত করে সরাসরি অর্ডার সম্পন্ন করুন।
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-3 p-3.5 rounded-2xl border border-[#E8DEC4] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-18 h-18 rounded-xl object-cover bg-stone-100 shrink-0 border border-[#E8DEC4]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1B1415] truncate">
                        {item.productName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span>সাইজ: <strong className="text-stone-700">{item.variantName}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#7B182B]">{item.variantWeight}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8DEC4]/70">
                      <div className="flex items-center border border-[#E8DEC4] rounded-xl bg-white shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.variantId, -1)}
                          className="p-1.5 text-stone-500 hover:text-stone-800 cursor-pointer"
                          aria-label="কমান"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {toBengaliNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.variantId, 1)}
                          className="p-1.5 text-stone-500 hover:text-stone-800 cursor-pointer"
                          aria-label="বাড়ান"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#1B1415]">
                          {formatBengaliPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.productId, item.variantId)}
                          className="p-1 text-stone-400 hover:text-[#7B182B] transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Bengali totals & coupon */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8DEC4] bg-[#FAF7F2] space-y-4">
              
              {/* Pickup badge notice */}
              <div className="flex items-center gap-1.5 p-2.5 bg-[#EDF7F1] border border-[#BCE1CC] rounded-xl text-[11px] text-[#194E38] font-bold">
                <Store className="w-3.5 h-3.5 text-[#194E38] shrink-0" />
                <span>হেতেম খাঁ স্টুডিও থেকে সরাসরি ফ্রি পিক-আপ অথবা হোম ডেলিভারি সুবিধা</span>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="কুপন কোড (ORGANIC10)"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#E8DEC4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B182B] uppercase font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#1B1415] hover:bg-black text-white rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  প্রয়োগ
                </button>
              </form>

              {couponMessage && (
                <p className={`text-xs ${couponMessage.success ? 'text-emerald-700 font-bold' : 'text-rose-600 font-medium'}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Price Breakdown in Bengali */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-bold text-stone-800">{formatBengaliPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#194E38] font-bold">
                    <span>কুপন ছাড় (১০%)</span>
                    <span>-{formatBengaliPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি / পিকআপ ফি</span>
                  <span className="text-stone-600 font-medium">পিক-আপে ৳০ / রাজশাহীতে ৳৬০</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-[#E8DEC4]">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-lg text-[#7B182B] font-extrabold">
                    {formatBengaliPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7B182B] via-[#8B1A30] to-[#550E1A] hover:from-[#8B1A30] hover:to-[#681120] text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>অনলাইনে অর্ডার চেকআউটে যান</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-500 font-semibold">
                🔒 ক্যাশ অন ডেলিভারি ও হেতেম খাঁ অন-সাইট পিকআপ সুবিধা
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
