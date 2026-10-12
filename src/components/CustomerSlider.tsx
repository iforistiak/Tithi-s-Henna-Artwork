import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
  Sparkles,
  Pause,
  Play,
  CheckCircle2,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';
import { CustomerSlide } from '../types/henna';
import { CUSTOMER_SLIDES } from '../data/hennaData';
import { toBengaliNumber } from '../utils/bengali';

interface CustomerSliderProps {
  slides?: CustomerSlide[];
}

export const CustomerSlider: React.FC<CustomerSliderProps> = ({
  slides = CUSTOMER_SLIDES,
}) => {
  const activeSlides = slides && slides.length > 0 ? slides : CUSTOMER_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Autoplay progression timer
  useEffect(() => {
    if (!isAutoplay || activeSlides.length <= 1) {
      setProgress(0);
      return;
    }

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % activeSlides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoplay, activeSlides.length, currentIndex]);

  const nextSlide = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const goToSlide = (idx: number) => {
    setProgress(0);
    setCurrentIndex(idx);
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <section id="customer-gallery" className="py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2] border-b border-[#E8DFD3] relative overflow-hidden">
      {/* Decorative subtle background aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#801D2D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C8963E]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#801D2D]/10 to-[#C8963E]/15 border border-[#801D2D]/20 text-[#801D2D] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>গ্রাহকদের লাইভ গ্যালারি ও আসল রঙের ঝলক</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A1418] tracking-tight">
            শতভাগ অর্গানিক মেহেদির নিখুঁত ডার্ক স্টেন
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            কোনো ফিল্টার ছাড়া আমাদের খাঁটি সোজাত মেহেদি কোণ ও ব্রাইডাল সার্ভিসের বাস্তব ফলাফল। প্রতিটি ছবির সাথে কাস্টমার রিভিউ ও সোশ্যাল লিংক যুক্ত রয়েছে।
          </p>
        </div>

        {/* Carousel Card Container */}
        {activeSlides.length > 0 && currentSlide && (
          <div
            className="bg-white rounded-3xl border border-[#E8DFD3] shadow-[0_12px_40px_-15px_rgba(107,29,40,0.12)] overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
              
              {/* Left Column: Image with Staining badge & controls */}
              <div className="lg:col-span-7 relative bg-stone-950 flex items-center justify-center min-h-[360px] sm:min-h-[460px] overflow-hidden group">
                <img
                  key={currentSlide.id}
                  src={currentSlide.imageUrl}
                  alt={currentSlide.customerName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Top Left Badge: Stain timeline */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-amber-200 text-xs px-3.5 py-1.5 rounded-full font-medium border border-amber-300/20 flex items-center gap-1.5 shadow-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentSlide.stainDay}</span>
                </div>

                {/* Top Right: Lightbox Zoom Button */}
                <button
                  onClick={() => setLightboxImg(currentSlide.imageUrl)}
                  className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black/90 text-white rounded-full backdrop-blur-md transition-all cursor-pointer border border-white/20 hover:scale-105 shadow-lg"
                  title="বড় আকারে জুম করে দেখুন"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Slide Count Overlay in Image bottom left */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white/90 text-[11px] px-3 py-1 rounded-full border border-white/10 font-medium">
                  {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(activeSlides.length)} স্লাইড
                </div>

                {/* Floating Left / Right Nav Arrows */}
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={prevSlide}
                    aria-label="পূর্ববর্তী স্লাইড"
                    className="pointer-events-auto p-3 rounded-full bg-white/90 hover:bg-white text-[#801D2D] shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="পরবর্তী স্লাইড"
                    className="pointer-events-auto p-3 rounded-full bg-white/90 hover:bg-white text-[#801D2D] shadow-lg transition-all cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Right Column: Customer Story & Custom Link */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF7F2] space-y-6">
                
                <div className="space-y-5">
                  {/* Category / Verified Pill */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#801D2D] bg-[#801D2D]/10 px-3 py-1 rounded-full border border-[#801D2D]/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#801D2D]" />
                      <span>ভেরিফাইড কাস্টমার রিভিউ</span>
                    </span>

                    {/* Autoplay Status indicator button */}
                    <button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-600 hover:text-[#801D2D] bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      title={isAutoplay ? 'অটো-প্লে পজ করুন' : 'অটো-প্লে চালু করুন'}
                    >
                      {isAutoplay ? (
                        <>
                          <Pause className="w-3 h-3 text-[#801D2D]" />
                          <span>অটো-প্লে চলছে</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-stone-600" />
                          <span>অটো-প্লে বন্ধ</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Customer Name & Location */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#2A1418] tracking-tight">
                      {currentSlide.customerName}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-medium flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
                      <span>{currentSlide.occasion}</span>
                    </p>
                  </div>

                  {/* Customer Testimonial Quote */}
                  <blockquote className="relative p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DFD3] text-stone-700 text-sm sm:text-[15px] leading-relaxed italic shadow-xs">
                    <div className="absolute -top-3 left-6 px-2 bg-white text-[#801D2D] text-xs font-bold font-serif">
                      “
                    </div>
                    {currentSlide.caption}
                  </blockquote>

                  {/* Stain Guarantee Badge */}
                  <div className="p-3.5 bg-gradient-to-r from-[#FAF7F2] to-[#F5ECE1] rounded-xl border border-[#E2D5C3] text-xs flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-[#801D2D] shrink-0 mt-0.5 fill-[#801D2D]/20" />
                    <div>
                      <span className="font-semibold text-[#3D1D22]">প্রাকৃতিক লসোনের শতভাগ খাঁটি পিগমেন্ট:</span>
                      <p className="text-stone-600 mt-0.5">
                        কোনো ক্ষতিকারক কেমিক্যাল বা কৃত্রিম ডাই নেই। সঠিক আফটারকেয়ার নিলে রঙ ১০ থেকে ১৪ দিন স্থায়ী হয়।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Custom External Link + Slider Navigation */}
                <div className="space-y-5 pt-4 border-t border-[#E8DFD3]">
                  
                  {/* Custom External Link Button (Prompt Requirement) */}
                  {currentSlide.customLink && (
                    <a
                      href={currentSlide.customLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#801D2D] to-[#6E1424] hover:from-[#6E1424] hover:to-[#540F1B] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] group border border-amber-300/20"
                    >
                      <span>{currentSlide.linkText || 'কাস্টম লিংক দেখুন'}</span>
                      <ExternalLink className="w-4 h-4 text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {/* Interactive Thumbnails Row */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>অন্যান্য গ্রাহকদের ফলাফল নির্বাচন করুন:</span>
                      <span className="text-[#801D2D] font-semibold">{toBengaliNumber(activeSlides.length)} টি ছবি</span>
                    </div>

                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                      {activeSlides.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => goToSlide(idx)}
                          className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            idx === currentIndex
                              ? 'border-[#801D2D] scale-105 shadow-md ring-2 ring-[#801D2D]/20'
                              : 'border-transparent opacity-60 hover:opacity-100 hover:border-stone-300'
                          }`}
                          title={s.customerName}
                        >
                          <img
                            src={s.imageUrl}
                            alt={s.customerName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {idx === currentIndex && (
                            <div className="absolute inset-0 bg-[#801D2D]/20 pointer-events-none" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Autoplay Progress Bar */}
                  {isAutoplay && (
                    <div className="w-full bg-stone-200/80 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#801D2D] to-[#C8963E] h-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 p-2.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer border border-white/20"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImg}
              alt="বড় ভিউ"
              className="max-h-[85vh] w-auto object-contain rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
