import React from 'react';
import { Home, Sparkles, Image as ImageIcon, ShoppingBag, Send } from 'lucide-react';
import { CartItem } from '../types/henna';

interface MobileBottomBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenPreOrder: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cartItems,
  onOpenCart,
  onOpenPreOrder,
}) => {
  const totalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-stone-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around">
      <a
        href="#"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7D2935] text-[10px] font-medium transition-colors"
      >
        <Home className="w-4 h-4 mb-0.5" />
        <span>হোম</span>
      </a>

      <a
        href="#products"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7D2935] text-[10px] font-medium transition-colors"
      >
        <Sparkles className="w-4 h-4 mb-0.5" />
        <span>পণ্য ও সাইজ</span>
      </a>

      <a
        href="#customer-gallery"
        className="flex flex-col items-center justify-center p-1.5 text-stone-600 hover:text-[#7D2935] text-[10px] font-medium transition-colors"
      >
        <ImageIcon className="w-4 h-4 mb-0.5" />
        <span>লাইভ গ্যালারি</span>
      </a>

      {/* Cart button with counter */}
      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center p-1.5 text-stone-700 hover:text-[#7D2935] text-[10px] font-medium cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 mb-0.5 text-[#5C1D26]" />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#7D2935] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
              {totalCount}
            </span>
          )}
        </div>
        <span>ব্যাগ</span>
      </button>

      {/* Primary Pre-Order Action */}
      <button
        onClick={onOpenPreOrder}
        className="flex items-center gap-1 bg-[#7D2935] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>প্রি-অর্ডার</span>
      </button>
    </div>
  );
};
