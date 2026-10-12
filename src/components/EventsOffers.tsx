import React, { useState } from 'react';
import { Calendar, Tag, GraduationCap, Copy, Check, Bell, ArrowRight, X, PhoneCall, Sparkles } from 'lucide-react';
import { INITIAL_EVENTS_OFFERS } from '../data/hennaData';
import { EventOffer } from '../types/henna';

interface EventsOffersProps {
  onPreOrderClick: () => void;
  onApplyCouponToCart?: (code: string) => void;
}

export const EventsOffers: React.FC<EventsOffersProps> = ({ onPreOrderClick, onApplyCouponToCart }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Workshop registration modal state
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [wsName, setWsName] = useState('');
  const [wsPhone, setWsPhone] = useState('');
  const [wsBatch, setWsBatch] = useState('অনলাইন লাইভ জুম সেশন (শুক্রবার)');
  const [wsSuccess, setWsSuccess] = useState(false);

  // VIP alert signup
  const [alertContact, setAlertContact] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onApplyCouponToCart) {
      onApplyCouponToCart(code);
    }
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const handleWorkshopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsName.trim() || !wsPhone.trim()) return;
    setWsSuccess(true);
    setTimeout(() => {
      setWsSuccess(false);
      setIsWorkshopModalOpen(false);
      setWsName('');
      setWsPhone('');
    }, 2000);
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertContact.trim()) return;
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setAlertContact('');
    }, 3000);
  };

  return (
    <section id="events-offers" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
            ইভেন্ট, ওয়ার্কশপ ও বিশেষ অফার
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            আসন্ন প্রোগ্রাম ও বিশেষ ডিসকাউন্ট আপডেট
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            ব্রাইডাল সিজনের বিশেষ স্লট বুকিং, মাস্টারক্লাস কর্মশালা এবং নিয়মিত আকর্ষণীয় অফারের সাথে সবসময় যুক্ত থাকুন।
          </p>
        </div>

        {/* 3 Offer & Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {INITIAL_EVENTS_OFFERS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                
                {/* Header tag */}
                <div className="flex items-center justify-between text-xs">
                  {item.type === 'offer' && (
                    <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{item.discountBadge || 'ডিসকাউন্ট'}</span>
                    </span>
                  )}
                  {item.type === 'bridal_slot' && (
                    <span className="text-[#7D2935] font-bold bg-[#7D2935]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>স্লট বুকিং</span>
                    </span>
                  )}
                  {item.type === 'workshop' && (
                    <span className="text-[#2D5337] font-bold bg-[#2D5337]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>ওয়ার্কশপ</span>
                    </span>
                  )}

                  <span className="text-stone-400 text-[11px] font-medium">{item.validUntil}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#7D2935]">{item.tagline}</p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Coupon Code Box */}
                {item.code && (
                  <div className="p-3 bg-white rounded-xl border border-dashed border-[#7D2935]/40 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase font-semibold">কুপন কোড</p>
                      <p className="font-mono font-bold text-[#7D2935] text-sm tracking-wider">{item.code}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(item.code!)}
                      className="px-3 py-1.5 bg-[#7D2935]/10 hover:bg-[#7D2935]/20 text-[#7D2935] text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedCode === item.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">কপি হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>কোড কপি</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>

              {/* Action Button */}
              <div>
                {item.type === 'workshop' ? (
                  <button
                    onClick={() => setIsWorkshopModalOpen(true)}
                    className="w-full py-2.5 px-4 bg-[#2D5337] hover:bg-[#1E3A26] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onPreOrderClick}
                    className="w-full py-2.5 px-4 bg-[#7D2935] hover:bg-[#5C1D26] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* VIP Alert & Broadcast Signup Banner */}
        <div className="bg-[#5C1D26] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-sm">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span>সরাসরি হোয়াটসঅ্যাপ / এসএমএস এলার্ট</span>
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
              পরবর্তী ফ্রেশ ব্যাচ ও বিশেষ অফারের নোটিফিকেশন পান সবার আগে
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              ঈদের নতুন ব্যাচ ওপেনিং, ব্রাইডাল লিমিটেড কোণ স্টক এবং বিশেষ ওয়ার্কশপের খবর সরাসরি আপনার নম্বরে পৌঁছে যাবে।
            </p>

            {alertSuccess ? (
              <div className="pt-2 p-3 bg-white/10 rounded-lg text-amber-200 text-xs font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ধন্যবাদ! আপনার নম্বরটি সফলভাবে যুক্ত হয়েছে। নতুন অফার এলেই আপডেট পাবেন।</span>
              </div>
            ) : (
              <form onSubmit={handleAlertSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="text"
                  required
                  value={alertContact}
                  onChange={(e) => setAlertContact(e.target.value)}
                  placeholder="আপনার ফোন নম্বর বা ইমেইল লিখুন"
                  className="px-4 py-2.5 text-xs sm:text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-300 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  আপডেট পেতে যুক্ত হন
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Workshop Registration Modal */}
        {isWorkshopModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#2D5337]" />
                  <span>ওয়ার্কশপে অংশ নিতে রেজিস্ট্রেশন</span>
                </h4>
                <button
                  onClick={() => setIsWorkshopModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {wsSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs space-y-1 text-center">
                  <p className="font-bold">রেজিস্ট্রেশন সফল হয়েছে!</p>
                  <p>আমাদের টিম শীঘ্রই হোয়াটসঅ্যাপে ক্লাস ডিটেইলস ও ম্যাটেরিয়াল কিট লিংক পাঠাবে।</p>
                </div>
              ) : (
                <form onSubmit={handleWorkshopSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={wsName}
                      onChange={(e) => setWsName(e.target.value)}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5337]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">হোয়াটসঅ্যাপ নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={wsPhone}
                      onChange={(e) => setWsPhone(e.target.value)}
                      placeholder="০১৭xxxxxxxx"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5337]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">ব্যাচ পছন্দ করুন</label>
                    <select
                      value={wsBatch}
                      onChange={(e) => setWsBatch(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5337] bg-white"
                    >
                      <option value="অনলাইন লাইভ জুম সেশন (শুক্রবার)">অনলাইন লাইভ জুম সেশন (শুক্রবার রাত ৮টা)</option>
                      <option value="অফলাইন হ্যান্ডস-অন সেশন (ধানমন্ডি স্টুডিও)">অফলাইন হ্যান্ডস-অন সেশন (ধানমন্ডি স্টুডিও)</option>
                    </select>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    * ফুল প্র্যাকটিস কিট (সোজাত পাউডার + কোণ শিট + এসেনশিয়াল অয়েল) কুরিয়ারে ফ্রি পাঠানো হবে।
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsWorkshopModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#2D5337] hover:bg-[#1E3A26] rounded-lg shadow-2xs"
                    >
                      সিট কনফার্ম করুন
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
