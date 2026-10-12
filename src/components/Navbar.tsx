import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/henna';
import { toBengaliNumber } from '../utils/bengali';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenOrder,
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
      {/* Top micro announcement bar with rich henna burgundy grading */}
      <div className="bg-gradient-to-r from-[#541222] via-[#7B1E34] to-[#541222] text-[#FAF8F5] text-xs py-2 px-4 text-center tracking-wide flex items-center justify-center gap-3 shadow-xs">
        <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>পুরো রাজশাহী শহরে হোম সার্ভিস ও ১০০% অর্গানিক মেহেদি কোণ · সরাসরি কল/হোয়াটসঅ্যাপ: <a href="tel:01601176076" className="text-amber-300 font-bold hover:underline">01601-176076</a></span>
        </span>
      </div>

      {/* Main 3-zone Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#EAE4DC] shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand Wordmark (English) */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B1E34] to-[#541222] flex items-center justify-center text-amber-200 font-bold text-xl shadow-xs group-hover:scale-103 transition-transform border border-amber-300/30">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#541222] group-hover:text-[#7B1E34] transition-colors leading-tight">
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
                className="hover:text-[#7B1E34] transition-colors whitespace-nowrap shrink-0 relative py-1 text-[13.5px] hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Order CTA & WhatsApp) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/8801601176076"
              target="_blank"
              rel="noopener noreferrer"
              title="হোয়াটসঅ্যাপ: 01601-176076"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#163B29] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>01601-176076</span>
            </a>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="শপিং ব্যাগ"
              className="relative p-2.5 rounded-xl text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer border border-stone-200/70"
            >
              <ShoppingBag className="w-5 h-5 text-[#541222]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#7B1E34] text-white text-[10px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {toBengaliNumber(totalCartCount)}
              </span>
            </button>

            {/* Primary Order Button */}
            <button
              onClick={onOpenOrder}
              className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7B1E34] to-[#541222] hover:from-[#8D233C] hover:to-[#611628] rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap hover:shadow-sm"
            >
              <span>অনলাইনে অর্ডার করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE4DC] px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-medium text-stone-800 hover:text-[#7B1E34] border-b border-stone-100"
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
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে মেসেজ করুন (01601-176076)</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-[#7B1E34] to-[#541222] rounded-xl shadow-xs cursor-pointer"
              >
                অনলাইনে অর্ডার ফরম খুলুন
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
