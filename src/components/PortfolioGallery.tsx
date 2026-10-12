import React, { useState } from 'react';
import { Sparkles, ZoomIn, ArrowRight } from 'lucide-react';
import { heroHennaImg, customerBridalImg, productConesImg } from '../data/hennaData';

interface PortfolioGalleryProps {
  onPreOrderForDesign: () => void;
}

interface PortfolioItem {
  id: string;
  title: string;
  category: 'bridal' | 'arabic' | 'mandala';
  categoryLabel: string;
  image: string;
  conesRequired: string;
  timeEstimate: string;
  description: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onPreOrderForDesign }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bridal' | 'arabic' | 'mandala'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const items: PortfolioItem[] = [
    {
      id: 'p-1',
      title: 'রাজকীয় ব্রাইডাল ফুল-হ্যান্ড জাল ও মেহগনি ম্যান্ডালা',
      category: 'bridal',
      categoryLabel: 'ব্রাইডাল হেভি',
      image: customerBridalImg,
      conesRequired: '২-৩টি ব্রাইডাল কোণ',
      timeEstimate: '৪-৫ ঘণ্টা নিখুঁত আর্ট',
      description: 'কনের হাতের তালু ও পেছনের অংশে ঘন জ্যামিতিক জাল, হাতি ও ময়ূর মোটিফ এবং ময়ূরের পালক ছোঁয়া গভীর খয়েরি ফিনিশ।',
    },
    {
      id: 'p-2',
      title: 'এলিগ্যান্ট এরাবিক ভাইন ও সূক্ষ্ম লতাপাতা',
      category: 'arabic',
      categoryLabel: 'এরাবিক ও ফ্লোরাল',
      image: heroHennaImg,
      conesRequired: '১টি রেগুলার কোণ',
      timeEstimate: '১-২ ঘণ্টা সময়',
      description: 'হালকা শেডিং ও আধুনিক ফ্লোরাল কার্ভস দিয়ে তৈরি, যা যেকোনো পারিবারিক অনুষ্ঠান বা উৎসবে হাতের সৌন্দর্য বহুগুণ বাড়িয়ে দেয়।',
    },
    {
      id: 'p-3',
      title: 'মডার্ন মিনিমালিস্ট সার্কুলার ম্যান্ডালা ও রিং ডিজাইন',
      category: 'mandala',
      categoryLabel: 'ম্যান্ডালা ও মিনিমাল',
      image: productConesImg,
      conesRequired: '১টি মিনি কোণ',
      timeEstimate: '৪৫ মিনিট দ্রুত আর্ট',
      description: 'তালুর কেন্দ্রবিন্দুতে একটি রাজস্থানি চক্র ম্যান্ডালা এবং আঙ্গুলগুলোতে সূক্ষ্ম রিং ব্যান্ড আর্ট। আধুনিক তরুণীদের প্রিয় পছন্দ।',
    },
    {
      id: 'p-4',
      title: 'ঐতিহ্যবাহী নকশী পদ্ম ও কলকা ব্রাইডাল প্যাটার্ন',
      category: 'bridal',
      categoryLabel: 'ব্রাইডাল হেভি',
      image: heroHennaImg,
      conesRequired: '২টি ব্রাইডাল কোণ',
      timeEstimate: '৩-৪ ঘণ্টা সময়',
      description: 'বাঙালি কনের বিয়ের অনুষ্ঠানের জন্য চিরন্তন পদ্মফুল ও কলকা মোটিফের চিরায়ত যুগলবন্দী।',
    },
  ];

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
              আর্টিস্টিক পোর্টফোলিও কালেকশন
            </p>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              ব্রাইডাল ও ফেস্টিভ মেহেদি নকশা ইন্সপিরেশন
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              নকশী অর্গানিক কোণ দিয়ে আঁকা চমৎকার কিছু শৈল্পিক প্যাটার্ন। যেকোনো পছন্দের ডিজাইনের জন্য প্রয়োজনীয় কোণ সরাসরি অর্ডার করতে পারেন।
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              সব নকশা
            </button>
            <button
              onClick={() => setActiveFilter('bridal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'bridal' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ব্রাইডাল হেভি
            </button>
            <button
              onClick={() => setActiveFilter('arabic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'arabic' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              এরাবিক ফ্লোরাল
            </button>
            <button
              onClick={() => setActiveFilter('mandala')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeFilter === 'mandala' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ম্যান্ডালা
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FAF8F5] rounded-xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/90 text-stone-800 backdrop-blur-xs">
                  {item.categoryLabel}
                </div>

                <button
                  onClick={() => setSelectedImage(item.image)}
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                >
                  <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-stone-900 text-sm leading-snug group-hover:text-[#7D2935] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>লাগে: <strong className="text-stone-800">{item.conesRequired}</strong></span>
                  <span>{item.timeEstimate}</span>
                </div>
              </div>

              <button
                onClick={onPreOrderForDesign}
                className="w-full py-2.5 px-3 bg-stone-100 hover:bg-[#7D2935] hover:text-white text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-t border-stone-200"
              >
                <span>এই ডিজাইনের কোণ প্রি-অর্ডার করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-3xl max-h-[90vh]">
              <img
                src={selectedImage}
                alt="বড় ভিউ"
                className="max-h-[85vh] w-auto object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
