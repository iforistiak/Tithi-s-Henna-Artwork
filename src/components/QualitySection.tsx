import React, { useState } from 'react';
import { ShieldCheck, Award, Leaf, Droplets, CheckCircle, XCircle, Flame, Sun } from 'lucide-react';
import { QUALITY_PILLARS, STAIN_TIMELINE } from '../data/hennaData';

export const QualitySection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(3); // Default to 48h peak stain

  return (
    <section id="quality" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
            বিশুদ্ধতা ও বিজ্ঞানসম্মত গুণমান
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            কেন নকল ‘ইনস্ট্যান্ট’ কেমিক্যাল নয়, বেছে নেবেন খাঁটি অর্গানিক মেহেদি?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            বাজারের অধিকাংশ ১০ মিনিটের তথাকথিত লাল মেহেদিতে থাকে কেরোসিন, টারপেনটাইন এবং মারাত্মক ডায়ামিন (PPD)। নকশী মেহেদি শতভাগ প্রাকৃতিক উদ্ভিজ্জ উপাদানে প্রস্তুত, যা আপনার ত্বকের পরম বন্ধু।
          </p>
        </div>

        {/* 4 Quality Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {QUALITY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:border-[#7D2935]/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-[#7D2935]">{pillar.badge}</span>
                  <span className="text-stone-400">০{idx + 1}</span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stain Timeline: 0h to 48h Progression Stepper */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs mb-16">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
              স্টেন বিজ্ঞান ও রঙ পরিবর্তনের ধাপ
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              অর্গানিক মেহেদির প্রাকৃতিক অক্সিডেশন পরিক্রমা (৪৮ ঘণ্টা)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              প্রাকৃতিক হেনার সক্রিয় উপাদান লসোন (Lawsonone) বাতাসের অক্সিজেনের সাথে মিশে ধীরে ধীরে গভীর গাঢ় মেরুন টোনে রূপ নেয়। নিচের ধাপগুলোতে ক্লিক করে দেখুন:
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAIN_TIMELINE.map((step, index) => {
              const isSelected = activeStage === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStage(index)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#7D2935] bg-[#7D2935]/5 shadow-xs ring-1 ring-[#7D2935]'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-500">{step.step}</span>
                    <span
                      className="w-4 h-4 rounded-full border border-white shadow-2xs"
                      style={{ backgroundColor: step.color }}
                      title={`কালার টোন: ${step.title}`}
                    />
                  </div>
                  <p className="text-xs font-bold text-[#7D2935] mb-1">{step.time}</p>
                  <p className="text-sm font-semibold text-stone-900 mb-2">{step.title}</p>
                  <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Banner */}
          <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
            <div className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full shrink-0 border border-stone-300"
                style={{ backgroundColor: STAIN_TIMELINE[activeStage].color }}
              />
              <div>
                <span className="font-semibold text-stone-900">
                  {STAIN_TIMELINE[activeStage].title} ({STAIN_TIMELINE[activeStage].time}):
                </span>{' '}
                <span className="text-stone-600">{STAIN_TIMELINE[activeStage].desc}</span>
              </div>
            </div>
            <div className="text-stone-500 shrink-0 text-xs font-medium">
              সর্বোচ্চ ফল পেতে ইভেন্টের ২ দিন পূর্বে লাগান
            </div>
          </div>
        </div>

        {/* Side-by-side Comparison Table: Chemical vs Organic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Nakhshi Organic Henna Box */}
          <div className="bg-[#FAF8F5] border-2 border-[#2D5337]/30 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#2D5337] font-bold">নিরাপদ ও পরীক্ষিত</p>
                <h3 className="text-xl font-bold text-stone-900">নকশী ১০০% অর্গানিক মেহেদি</h3>
              </div>
              <span className="text-xs font-medium bg-[#2D5337]/10 text-[#2D5337] px-3 py-1 rounded-full">
                খাঁটি হারবাল
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#2D5337] shrink-0 mt-0.5" />
                <span><strong>উপাদান:</strong> খাঁটি রাজস্থানি সোজাত পাতা, নীলগিরি ইউক্যালিপটাস তেল ও লেবুর রস।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#2D5337] shrink-0 mt-0.5" />
                <span><strong>ত্বকের অনুভূতি:</strong> কোনো ধরনের জ্বালাপোড়া, চুলকানি বা লালচে র‍্যাশ হয় না।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#2D5337] shrink-0 mt-0.5" />
                <span><strong>সুবাস:</strong> প্রাকৃতিক ইউক্যালিপটাস ও ল্যাভেন্ডার এসেনশিয়াল অয়েলের চমৎকার সুবাস।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#2D5337] shrink-0 mt-0.5" />
                <span><strong>রঙের স্থায়ীত্ব:</strong> ১০ থেকে ১৪ দিন স্বাভাবিকভাবে থাকে, রঙ ওঠার সময় ছোপ ছোপ হয় না।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#2D5337] shrink-0 mt-0.5" />
                <span><strong>নিরাপত্তা:</strong> শিশু, বয়স্ক ও সন্তানসম্ভবা মায়েদের ত্বকের জন্যও সম্পূর্ণ বিপদমুক্ত।</span>
              </li>
            </ul>
          </div>

          {/* Market Chemical Henna Box */}
          <div className="bg-stone-100/60 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-rose-600 font-bold">মার্কেট ইনস্ট্যান্ট কোণ</p>
                <h3 className="text-xl font-bold text-stone-800">বাজারের কৃত্রিম কেমিক্যাল কোণ</h3>
              </div>
              <span className="text-xs font-medium bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                বিপজ্জনক
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>উপাদান:</strong> বিষাক্ত PPD ডাই, কেরোসিন, টারপেনটাইন ও মেটালিক সল্ট।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>ত্বকের অনুভূতি:</strong> লাগানোর সাথে সাথে তীব্র জ্বালাপোড়া ও অনেকের ত্বক পুড়ে ফোসকা পড়ে।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>সুবাস:</strong> উৎকট কেমিক্যাল ও জ্বালানি তেলের বাজে গন্ধ।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>রঙের স্থায়ীত্ব:</strong> ২-৩ দিনেই চামড়া থেকে কদর্যভাবে খসে পড়ে ত্বক নষ্ট করে দেয়।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>নিরাপত্তা:</strong> স্থায়ী স্কিন অ্যালার্জি, একজিমা এবং কিডনির ক্ষতির আশঙ্কা থাকে।</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Aftercare Tips Box */}
        <div className="mt-12 bg-white border border-stone-200 rounded-xl p-6 sm:p-7">
          <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#7D2935]" />
            <span>গাঢ়তম ডার্ক মেহগনি রঙের জন্য নকশীর ঘরোয়া টিপস:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-600">
            <div className="p-3 bg-stone-50 rounded-lg">
              <p className="font-semibold text-stone-800 mb-1">১. পানি পরিহার করুন</p>
              <p>মেহেদি খসে পড়ার পর অন্তত ১০-১২ ঘণ্টা সাবান বা ঠান্ডা পানি থেকে হাত দূরে রাখুন।</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg">
              <p className="font-semibold text-stone-800 mb-1">২. লবঙ্গের ভাপ (ধূনি)</p>
              <p>তাওয়ায় ২-৩টি লবঙ্গ গরম করে তার ধোঁয়া হাতে লাগালে তাপের কারণে রঙ দ্রুত গাঢ় হয়।</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg">
              <p className="font-semibold text-stone-800 mb-1">৩. হেনা অয়েল বা নারিকেল তেল</p>
              <p>হাত ধোয়ার বদলে আমাদের হেনা অয়েল বা খাঁটি নারিকেল তেল মেখে প্রাকৃতিক সুরক্ষা স্তর তৈরি করুন।</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
