import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { CartItem } from '../types/henna';
import { ARTIST_INFO } from '../data/hennaData';
import { toBengaliNumber } from '../utils/bengali';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenPreOrder: () => void;
  onOpenTracking: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenPreOrder,
  onOpenTracking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { href: '#products', label: 'মেহেদি পণ্য ও সাইজ' },
    { href: '#services', label: 'রাজশাহী হোম সার্ভিস' },
    { href: '#quality', label: 'গুণমান ও বিশুদ্ধতা' },
    { href: '#customer-gallery', label: 'লাইভ গ্যালারি' },
    { href: '#reviews', label: 'গ্রাহক রিভিউ' },
    { href: '#events-offers', label: 'অফার ও বুকিং' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#5C1D26] text-[#FAF8F5] text-xs py-2 px-4 text-center tracking-wide flex items-center justify-between sm:justify-center gap-3">
        <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>পুরো রাজশাহী শহরে হোম সার্ভিস ও ১০০% অর্গানিক মেহেদি কোণ · হটলাইন: <a href="tel:01601176076" className="text-amber-300 font-bold hover:underline">01601-176076</a></span>
        </span>
        <button
          onClick={onOpenTracking}
          className="hidden md:inline-block underline text-stone-200 hover:text-white text-xs cursor-pointer ml-3 font-normal"
        >
          অর্ডার ট্র্যাক
        </button>
      </div>

      {/* Main 3-zone Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand Wordmark (In English as requested: Tithi's Henna Artwork) */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#7D2935] flex items-center justify-center text-amber-200 font-bold text-xl shadow-xs group-hover:bg-[#5C1D26] transition-colors">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#5C1D26] group-hover:text-[#7D2935] transition-colors leading-tight">
                Tithi's Henna Artwork
              </span>
              <span className="text-[10px] tracking-wider text-stone-500 font-medium">
                Professional Henna Artist · Rajshahi
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#7D2935] transition-colors whitespace-nowrap shrink-0 relative py-1 text-[13.5px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Pre-Order CTA & WhatsApp) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Direct WhatsApp Callout in Header */}
            <a
              href="https://wa.me/8801601176076"
              target="_blank"
              rel="noopener noreferrer"
              title="হোয়াটসঅ্যাপে যোগাযোগ: 01601-176076"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>01601-176076</span>
            </a>

            {/* Order Tracking lookup button on desktop */}
            <button
              onClick={onOpenTracking}
              title="অর্ডার ট্র্যাকিং"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-[#7D2935] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7D2935]" />
              <span>ট্র্যাকিং</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="শপিং ব্যাগ"
              className="relative p-2 rounded-lg text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#5C1D26]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7D2935] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs animate-in zoom-in-75">
                  {toBengaliNumber(totalCartCount)}
                </span>
              )}
            </button>

            {/* Primary Pre-Order Button */}
            <button
              onClick={onOpenPreOrder}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#7D2935] hover:bg-[#5C1D26] rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>অনলাইনে প্রি-অর্ডার</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-5 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-stone-800 hover:text-[#7D2935] border-b border-stone-100"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/8801601176076"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-lg shadow-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে মেসেজ করুন (01601-176076)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPreOrder();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#7D2935] hover:bg-[#5C1D26] rounded-lg shadow-xs"
              >
                অনলাইনে প্রি-অর্ডার ফরম খুলুন
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full py-2 text-center text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
              >
                অর্ডার ট্র্যাক করুন
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
