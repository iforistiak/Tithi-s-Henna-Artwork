import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Plus, Edit3, Trash2, Maximize2, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { CustomerSlide } from '../types/henna';
import { INITIAL_SLIDES, customerBridalImg, heroHennaImg, productConesImg } from '../data/hennaData';

interface CustomerSliderProps {
  slides: CustomerSlide[];
  onUpdateSlides: (newSlides: CustomerSlide[]) => void;
}

export const CustomerSlider: React.FC<CustomerSliderProps> = ({ slides, onUpdateSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  // Manager modal state
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  // Form states for adding/editing slide
  const [formName, setFormName] = useState('');
  const [formOccasion, setFormOccasion] = useState('');
  const [formStainDay, setFormStainDay] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formCustomLink, setFormCustomLink] = useState('');
  const [formLinkText, setFormLinkText] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [managerMessage, setManagerMessage] = useState<string | null>(null);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoplay || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  // Open manager for a new slide
  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setFormName('');
    setFormOccasion('উত্তরা, ঢাকা — বিয়ের অনুষ্ঠান');
    setFormStainDay('৪৮ ঘণ্টা পর (Peak Dark Mahogany)');
    setFormImageUrl(customerBridalImg);
    setFormCustomLink('https://instagram.com');
    setFormLinkText('ইনস্টাগ্রামে ছবি দেখুন');
    setFormCaption('“অর্গানিক মেহেদির রঙ এতো নিখুঁত ও গাঢ় হয়েছে যা ভাষায় প্রকাশ করার মতো না!”');
    setIsManagerOpen(true);
  };

  // Open manager to edit an existing slide
  const handleOpenEditSlide = (slide: CustomerSlide) => {
    setEditingSlideId(slide.id);
    setFormName(slide.customerName);
    setFormOccasion(slide.occasion);
    setFormStainDay(slide.stainDay);
    setFormImageUrl(slide.imageUrl);
    setFormCustomLink(slide.customLink);
    setFormLinkText(slide.linkText);
    setFormCaption(slide.caption);
    setIsManagerOpen(true);
  };

  // Save or update slide
  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImageUrl.trim() || !formName.trim()) {
      alert('অনুগ্রহ করে কাস্টমার নাম ও ছবির লিংক প্রদান করুন।');
      return;
    }

    if (editingSlideId) {
      // Update existing
      const updated = slides.map((s) =>
        s.id === editingSlideId
          ? {
              ...s,
              customerName: formName,
              occasion: formOccasion,
              stainDay: formStainDay,
              imageUrl: formImageUrl,
              customLink: formCustomLink,
              linkText: formLinkText || 'লিংক দেখুন',
              caption: formCaption,
            }
          : s
      );
      onUpdateSlides(updated);
      setManagerMessage('স্লাইড সফলভাবে আপডেট করা হয়েছে!');
    } else {
      // Add new
      const newSlide: CustomerSlide = {
        id: `slide-${Date.now()}`,
        customerName: formName,
        occasion: formOccasion,
        stainDay: formStainDay,
        imageUrl: formImageUrl,
        customLink: formCustomLink || 'https://instagram.com',
        linkText: formLinkText || 'কাস্টমার পোস্ট দেখুন',
        caption: formCaption,
      };
      onUpdateSlides([...slides, newSlide]);
      setCurrentIndex(slides.length);
      setManagerMessage('নতুন কাস্টমার ছবি স্লাইডারে যুক্ত হয়েছে!');
    }

    setTimeout(() => {
      setManagerMessage(null);
      setIsManagerOpen(false);
    }, 1200);
  };

  // Delete slide
  const handleDeleteSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('স্লাইডারে অন্তত একটি ছবি থাকা প্রয়োজন।');
      return;
    }
    if (confirm('আপনি কি এই ছবিটি স্লাইডার থেকে মুছে ফেলতে চান?')) {
      const updated = slides.filter((s) => s.id !== id);
      onUpdateSlides(updated);
      setCurrentIndex(0);
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm('আপনি কি ডিফল্ট ছবিগুলোতে ফিরে যেতে চান?')) {
      onUpdateSlides(INITIAL_SLIDES);
      setCurrentIndex(0);
      setIsManagerOpen(false);
    }
  };

  return (
    <section id="customer-gallery" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Manager Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
              কাস্টমার লাইভ ফটো স্লাইডার
            </p>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              গ্রাহকদের হাতের বাস্তব ও লাইভ মেহেদি রঙ
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              কোনো ফিল্টার ছাড়াই আমাদের অর্গানিক কোণের বাস্তব ফলাফল। যেকোনো সময় নতুন ছবি ও নিজস্ব ইনস্টাগ্রাম/ফেসবুক লিংক যুক্ত করা যায়।
            </p>
          </div>

          {/* Action buttons: Edit/Add slides */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={handleOpenAddSlide}
              className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#7D2935]" />
              <span>নতুন ছবি ও লিংক যোগ করুন</span>
            </button>

            <button
              onClick={() => setIsManagerOpen(true)}
              className="px-3.5 py-2 bg-[#7D2935]/10 hover:bg-[#7D2935]/20 text-[#7D2935] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="সব স্লাইড ম্যানেজ ও এডিট করুন"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>স্লাইডার ম্যানেজার ({slides.length})</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        {slides.length > 0 && currentSlide && (
          <div
            className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Image with Lightbox zoom */}
              <div className="lg:col-span-7 relative bg-stone-900 min-h-[320px] sm:min-h-[420px] max-h-[520px] overflow-hidden group">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.customerName}
                  className="w-full h-full object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Top Badge: Stain Time */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-amber-200 text-xs px-3 py-1.5 rounded-md font-medium border border-white/10 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{currentSlide.stainDay}</span>
                </div>

                {/* Lightbox Zoom Icon Button */}
                <button
                  onClick={() => setLightboxImg(currentSlide.imageUrl)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-md backdrop-blur-xs transition-colors cursor-pointer"
                  title="বড় আকারে দেখুন"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Prev / Next floating overlay controls */}
                <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={prevSlide}
                    aria-label="পূর্ববর্তী ছবি"
                    className="pointer-events-auto p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="পরবর্তী ছবি"
                    className="pointer-events-auto p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-105"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Customer Story & Custom Link */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
                <div className="space-y-4">
                  
                  {/* Customer Meta */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
                        প্রকৃত গ্রাহকের অভিজ্ঞতা
                      </span>
                      <span className="text-xs text-stone-400 tabular-nums">
                        {currentIndex + 1} / {slides.length}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                      {currentSlide.customerName}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {currentSlide.occasion}
                    </p>
                  </div>

                  {/* Customer Quote */}
                  <blockquote className="text-stone-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-[#7D2935] pl-4 py-1">
                    {currentSlide.caption}
                  </blockquote>

                  {/* Stain Tone Verification */}
                  <div className="p-3 bg-[#FAF8F5] rounded-xl text-xs space-y-1 text-stone-700 border border-stone-200/70">
                    <p className="font-semibold text-stone-800">রঙের তীব্রতা ও স্থায়িত্ব:</p>
                    <p className="text-stone-600">
                      ১০০% সোজাত অর্গানিক উপাদানে তৈরি। কোনো রকম ডাই ছাড়া প্রাকৃতিক লসোনের আসল ফলাফল।
                    </p>
                  </div>
                </div>

                {/* Custom Link Button & Slide Controls */}
                <div className="space-y-4 pt-4 border-t border-stone-100">
                  
                  {/* The Custom Link required by prompt! */}
                  {currentSlide.customLink && (
                    <a
                      href={currentSlide.customLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-lg bg-[#7D2935] hover:bg-[#5C1D26] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs group"
                    >
                      <span>{currentSlide.linkText || 'কাস্টম লিংক দেখুন'}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {/* Quick Edit current slide shortcut */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <button
                      onClick={() => handleOpenEditSlide(currentSlide)}
                      className="hover:text-[#7D2935] flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এই স্লাইডের তথ্য বা লিংক এডিট করুন</span>
                    </button>

                    <button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className="hover:text-stone-800 cursor-pointer text-[11px]"
                    >
                      {isAutoplay ? 'অটো-প্লে চলছে (Pause)' : 'অটো-প্লে বন্ধ (Play)'}
                    </button>
                  </div>

                  {/* Thumbnails row */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
                    {slides.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          idx === currentIndex
                            ? 'border-[#7D2935] scale-105 shadow-xs'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={s.imageUrl}
                          alt={s.customerName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl">
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxImg}
                alt="বড় ভিউ"
                className="max-h-[85vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Slider Manager & Custom Link Editor Modal */}
        {isManagerOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {editingSlideId ? 'কাস্টমার ছবি ও লিংক এডিট করুন' : 'স্লাইডারে নতুন ছবি ও কাস্টম লিংক যুক্ত করুন'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    ছবি, বিবরণ ও যেকোনো কাস্টম লিংক (যেমন ফেসবুক/ইনস্টাগ্রাম পোস্ট) সেভ করুন
                  </p>
                </div>
                <button
                  onClick={() => setIsManagerOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {managerMessage && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{managerMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSaveSlide} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      গ্রাহকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="যেমন: তানজিলা ইসলাম"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      অনুষ্ঠান / এলাকা
                    </label>
                    <input
                      type="text"
                      value={formOccasion}
                      onChange={(e) => setFormOccasion(e.target.value)}
                      placeholder="যেমন: ধানমন্ডি — ব্রাইডাল রিসেপশন"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      স্টেনের সময়কাল (Stain Tag)
                    </label>
                    <input
                      type="text"
                      value={formStainDay}
                      onChange={(e) => setFormStainDay(e.target.value)}
                      placeholder="যেমন: ৪৮ ঘণ্টা পর (Peak Dark Mahogany)"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ছবির লিংক (Image URL) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="ইমেজ URL অথবা প্রিসেট নির্বাচন করুন"
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                    />
                  </div>
                </div>

                {/* Preset Image Chooser for quick test */}
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1.5">
                    অথবা তৈরি প্রিসেট ছবি ব্যবহার করুন:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFormImageUrl(customerBridalImg)}
                      className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md cursor-pointer"
                    >
                      ব্রাইডাল ডার্ক স্টেন
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormImageUrl(heroHennaImg)}
                      className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md cursor-pointer"
                    >
                      হাতে আঁকা মেহেদি নকশা
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormImageUrl(productConesImg)}
                      className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md cursor-pointer"
                    >
                      ফ্রেশ কোণ ডিসপ্লে
                    </button>
                  </div>
                </div>

                {/* Custom Link Fields (Prompt requirement) */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <p className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#7D2935]" />
                    <span>কাস্টম লিংক কনফিগারেশন (Custom External Link)</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-600 mb-1">
                        কাস্টম লিংক URL (ওয়েবসাইট / ইনস্টাগ্রাম / ফেসবুক)
                      </label>
                      <input
                        type="url"
                        value={formCustomLink}
                        onChange={(e) => setFormCustomLink(e.target.value)}
                        placeholder="https://instagram.com/yourpost"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-600 mb-1">
                        বাটন লেবেল (লিংকের নাম)
                      </label>
                      <input
                        type="text"
                        value={formLinkText}
                        onChange={(e) => setFormLinkText(e.target.value)}
                        placeholder="যেমন: ইনস্টাগ্রামে পোস্ট ও কমেন্ট দেখুন"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935] bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    কাস্টমার রিভিউ ক্যাপশন / মন্তব্য
                  </label>
                  <textarea
                    rows={2}
                    value={formCaption}
                    onChange={(e) => setFormCaption(e.target.value)}
                    placeholder="মেহেদির রঙ ও মান নিয়ে কাস্টমারের মতামত লিখুন..."
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ডিফল্ট স্লাইডে রিসেট</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsManagerOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#7D2935] hover:bg-[#5C1D26] rounded-lg shadow-2xs cursor-pointer"
                    >
                      {editingSlideId ? 'পরিবর্তন সেভ করুন' : 'স্লাইড যোগ করুন'}
                    </button>
                  </div>
                </div>

              </form>

              {/* Existing Slides List with delete option */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <p className="text-xs font-bold text-stone-800">বর্তমানে স্লাইডারে থাকা ছবিগুলো ({slides.length}):</p>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {slides.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={s.imageUrl}
                          alt=""
                          className="w-9 h-9 rounded-md object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="font-semibold text-stone-900 truncate">{s.customerName}</p>
                          <p className="text-[11px] text-stone-500 truncate">{s.stainDay}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          onClick={() => handleOpenEditSlide(s)}
                          className="p-1.5 text-stone-600 hover:text-[#7D2935] hover:bg-white rounded-md cursor-pointer"
                          title="এডিট করুন"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(s.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-white rounded-md cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
