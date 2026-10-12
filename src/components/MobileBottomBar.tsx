import React from 'react';
import { Home, Sparkles, Image as ImageIcon, ShoppingBag, Send } from 'lucide-react';
import { CartItem } from '../types/henna';
import { toBengaliNumber } from '../utils/bengali';

interface MobileBottomBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenOrder: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cartItems,
  onOpenCart,
  onOpenOrder,
}) => {
  const totalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#EAE4DC] shadow-lg px-2 py-1.5 flex items-center justify-around">
      <a
        href="#"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7B1E34] text-[10px] font-semibold transition-colors"
      >
        <Home className="w-4 h-4 mb-0.5" />
        <span>হোম</span>
      </a>

      <a
        href="#products"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7B1E34] text-[10px] font-semibold transition-colors"
      >
        <Sparkles className="w-4 h-4 mb-0.5" />
        <span>পণ্য ও সাইজ</span>
      </a>

      <a
        href="#customer-gallery"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7B1E34] text-[10px] font-semibold transition-colors"
      >
        <ImageIcon className="w-4 h-4 mb-0.5" />
        <span>লাইভ গ্যালারি</span>
      </a>

      {/* Cart button */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center p-1.5 text-stone-700 hover:text-[#7B1E34] text-[10px] font-semibold cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 mb-0.5 text-[#541222]" />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#7B1E34] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
              {toBengaliNumber(totalCount)}
            </span>
          )}
        </div>
        <span>ব্যাগ</span>
      </button>

      {/* Primary Order Action */}
      <button
        onClick={onOpenOrder}
        className="flex items-center gap-1 bg-gradient-to-r from-[#7B1E34] to-[#541222] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>অর্ডার</span>
      </button>
    </div>
  );
};
