import React from 'react';
import { ShieldCheck, Sparkles, MapPin, ArrowRight, CheckCircle2, MessageCircle, Home } from 'lucide-react';
import { heroHennaImg, ARTIST_INFO } from '../data/hennaData';

interface HeroProps {
  onOpenPreOrder: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPreOrder, onExploreProducts }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Editorial Kicker with English Brand and Artist Credentials */}
            <div className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-[#7D2935] font-semibold">
              <span className="w-5 h-0.5 bg-[#7D2935]"></span>
              <span className="font-bold text-stone-900 tracking-normal">Tithi's Henna Artwork</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600 font-normal">Professional Henna Artist</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#2D5337] font-medium">University of Rajshahi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-stone-900 leading-[1.2] tracking-tight text-balance">
              পুরো রাজশাহী শহরে <span className="text-[#7D2935]">হোম সার্ভিস</span> ও <br className="hidden sm:inline" />
              ১০০% খাঁটি <span className="text-[#2D5337]">অর্গানিক মেহেদি</span> কোণ
            </h1>

            {/* Subtitle / Bio from screenshot */}
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {ARTIST_INFO.bio}
            </p>

            {/* Services from Screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-800 pt-1">
              <div className="p-2.5 bg-white/90 rounded-lg border border-stone-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5337] shrink-0" />
                <span className="font-semibold">রাজশাহীতে হোম সার্ভিস</span>
              </div>
              <div className="p-2.5 bg-white/90 rounded-lg border border-stone-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5337] shrink-0" />
                <span className="font-semibold">অন-সাইট পিক আপ সুবিধা</span>
              </div>
              <div className="p-2.5 bg-white/90 rounded-lg border border-stone-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5337] shrink-0" />
                <span className="font-semibold">১০০% পিউর অর্গানিক কোণ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPreOrder}
                className="px-6 py-3.5 bg-[#7D2935] hover:bg-[#5C1D26] text-white font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 group"
              >
                <span>অনলাইনে প্রি-অর্ডার ও বুকিং</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/8801601176076"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ: 01601-176076</span>
              </a>

              <button
                onClick={onExploreProducts}
                className="px-5 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
              >
                পণ্য ও সাইজ দেখুন
              </button>
            </div>

            {/* Location marker & Trust Footnote */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-600">
              <span className="flex items-center gap-1 font-semibold text-stone-800">
                <MapPin className="w-3.5 h-3.5 text-[#7D2935]" />
                <span>মহিলা কলেজ রোড, হেতেম খাঁ, রাজশাহী</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>ইন্সটাগ্রাম: <strong className="text-stone-900">@tithishennaartwork</strong></span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">Always Open</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-stone-100">
              <img
                src={heroHennaImg}
                alt="Tithi's Henna Artwork - Professional Mehndi"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-amber-200">Tithi's Henna Artwork</span>
                  <span className="text-stone-300">৪৮ ঘণ্টার পিক মেহগনি রঙ</span>
                </div>
              </div>
            </div>

            {/* Floating badge for Rajshahi Home Service */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-sm border border-stone-200 py-2.5 px-4 rounded-xl shadow-md text-stone-800 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#2D5337]/10 flex items-center justify-center text-[#2D5337] shrink-0 font-bold">
                ✓
              </div>
              <div>
                <p className="font-bold text-stone-900 leading-tight">Home Service in Whole Rajshahi</p>
                <p className="text-[11px] text-stone-500">ব্রাইডাল, সেমি-ব্রাইডাল ও নন-ব্রাইডাল ইভেন্ট</p>
              </div>
            </div>
          </div>

        </div>

        {/* Services Showcase Strip from Screenshot */}
        <div id="services" className="mt-12 sm:mt-16 pt-8 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-4.5 rounded-xl border border-stone-200/80 shadow-2xs space-y-1.5">
            <p className="text-xs uppercase tracking-wider text-[#7D2935] font-bold">Speciality 01</p>
            <h3 className="text-sm font-bold text-stone-900">Home Service (হোম সার্ভিস)</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              পুরো রাজশাহী শহরে কনের বাড়ি বা ইভেন্ট ভেন্যুতে গিয়ে প্রফেশনাল ব্রাইডাল, সেমি-ব্রাইডাল ও নন-ব্রাইডাল মেহেদি আর্ট প্রদান।
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-stone-200/80 shadow-2xs space-y-1.5">
            <p className="text-xs uppercase tracking-wider text-[#2D5337] font-bold">Speciality 02</p>
            <h3 className="text-sm font-bold text-stone-900">Organic Henna For Sell</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              ১০০% অর্গানিক সোজাত মেহেদি কোণ, পাউডার ও এসেনশিয়াল অয়েল। You will have the best quality Insha Allah!
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-stone-200/80 shadow-2xs space-y-1.5">
            <p className="text-xs uppercase tracking-wider text-amber-700 font-bold">Speciality 03</p>
            <h3 className="text-sm font-bold text-stone-900">Collect on Site / Pick-up</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              মহিলা কলেজ রোড, হেতেম খাঁ স্টুডিও থেকে সরাসরি ফ্রি পিক-আপ অথবা রাজশাহী সিটিতে দ্রুত হোম ডেলিভারি সুবিধা।
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
