import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Heart, Store, Instagram, Clock } from 'lucide-react';
import { ARTIST_INFO } from '../data/hennaData';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenPreOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking, onOpenPreOrder }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'হেতেম খাঁ স্টুডিও থেকে পিক-আপ (Collect on Site) কীভাবে করবো?',
      a: 'অনলাইনে প্রি-অর্ডারের সময় "পিক আপ / কালেক্ট অন সাইট" অপশনটি সিলেক্ট করুন। কোনো ডেলিভারি চার্জ লাগবে না (ফ্রি)। অর্ডার কনফার্ম হলে আমাদের আর্টিস্ট তিতি সরাসরি কল দিয়ে মহিলা কলেজ রোড, হেতেম খাঁ স্টুডিও থেকে সংগ্রহের সময় জানিয়ে দিবেন।',
    },
    {
      q: 'পুরো রাজশাহী শহরে হোম সার্ভিস কীভাবে বুকিং করবো?',
      a: 'আমরা ব্রাইডাল, সেমি-ব্রাইডাল ও নন-ব্রাইডাল যেকোনো ইভেন্টে রাজশাহীর যেকোনো এলাকায় হোম সার্ভিস প্রদান করি। আপনি অনলাইনে প্রি-অর্ডার ফরমের নোট বক্সে ইভেন্টের ঠিকানা লিখে দিতে পারেন অথবা সরাসরি 01601-176076 নম্বরে হোয়াটসঅ্যাপে কল/মেসেজ করে স্লট নিশ্চিত করতে পারেন।',
    },
    {
      q: 'অর্গানিক মেহেদি কোণ কতদিন ভালো থাকে ও কীভাবে সংরক্ষণ করবেন?',
      a: 'আমাদের কোণ ১০০% কেমিক্যাল ও প্রিজারভেটিভমুক্ত। সাধারণ তাপমাত্রায় ৫ থেকে ৭ দিন ভালো থাকে। তবে ডিপ ফ্রিজে রেখে দিলে ৫-৬ মাস পর্যন্ত এর রঙ ও ফ্লো চমৎকার সতেজ থাকে। ব্যবহারের ৩০ মিনিট আগে নামিয়ে স্বাভাবিক করলেই হবে।',
    },
    {
      q: 'মেহেদির সর্বোচ্চ গাঢ় রঙ (Peak Stain) পেতে কত সময় লাগে?',
      a: 'প্রাকৃতিক লসোন বাতাসের অক্সিজেনে অক্সিডাইজ হয়ে ধীরে ধীরে গাঢ় হয়। পেস্ট তোলার পর প্রথমে উজ্জ্বল কমলা রঙ হয় এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এটি নিখুঁত গাঢ় চকোলেট-খয়েরি বা ডার্ক মেহগনি রূপ ধারণ করে।',
    },
  ];

  return (
    <footer className="bg-[#241E1E] text-stone-300 pt-16 pb-28 sm:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQs Section */}
        <div className="mb-14 pb-12 border-b border-stone-800">
          <div className="max-w-2xl mb-6">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>সাধারণ জিজ্ঞাসা (FAQ)</span>
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left font-semibold text-sm text-stone-100 flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="mt-2.5 text-xs text-stone-400 leading-relaxed border-t border-stone-800/80 pt-2.5">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4-Column Footer with screenshot verified information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#7D2935] flex items-center justify-center text-amber-200 font-bold text-lg">
                T
              </div>
              <div>
                <span className="text-xl font-bold text-white leading-none block">
                  Tithi's Henna Artwork
                </span>
                <span className="text-[10px] tracking-wider text-amber-400/90 font-medium uppercase">
                  Professional Henna Artist
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              {ARTIST_INFO.bio}
            </p>

            <div className="space-y-1 text-xs text-emerald-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>১০০% অর্গানিক ও স্কিন-সেইফ</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Always open (সার্বক্ষণিক সেবা)</span>
              </div>
            </div>
          </div>

          {/* Direct Contact & WhatsApp & Email from Screenshots */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">যোগাযোগ ও লোকেশন</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:01601176076" className="hover:text-white font-semibold text-stone-200">
                  হটলাইন: 01601-176076
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/8801601176076"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline text-emerald-400 font-semibold"
                >
                  হোয়াটসঅ্যাপ: 01601-176076
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:jinnatislamtithi@gmail.com" className="hover:text-white underline text-stone-300">
                  jinnatislamtithi@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-rose-400 shrink-0" />
                <a
                  href="https://instagram.com/tithishennaartwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline text-rose-300"
                >
                  @tithishennaartwork
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>মহিলা কলেজ রোড, হেতেম খাঁ, রাজশাহী, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

          {/* Services & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">সেবাসমূহ (Services)</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="text-stone-300">
                ✓ Home service in whole Rajshahi city
              </li>
              <li className="text-stone-300">
                ✓ Bridal, semi-bridal, non-bridal events
              </li>
              <li className="text-stone-300">
                ✓ Organic henna for sell (best quality)
              </li>
              <li className="text-stone-300">
                ✓ Collect on site / স্টুডিও থেকে ফ্রি পিক-আপ
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors text-amber-400 cursor-pointer pt-1"
                >
                  লাইভ প্রি-অর্ডার ট্র্যাকিং
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery & Pickup details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wide">পিক-আপ ও ডেলিভারি</h4>
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800 text-xs space-y-1.5 text-stone-400">
              <p className="font-semibold text-emerald-400 flex items-center gap-1">
                <Store className="w-3.5 h-3.5" />
                <span>অন-সাইট পিক-আপ: ফ্রি (৳০)</span>
              </p>
              <p>মহিলা কলেজ রোড, হেতেম খাঁ স্টুডিও</p>
              <p className="font-semibold text-stone-300 pt-1">রাজশাহী সিটি হোম ডেলিভারি: ৳৬০</p>
              <p>সারাদেশে কুরিয়ার ক্যাশ অন ডেলিভারি: ৳১৩০</p>
            </div>

            <button
              onClick={onOpenPreOrder}
              className="w-full py-2.5 px-3 bg-[#7D2935] hover:bg-[#5C1D26] text-white text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer shadow-2xs"
            >
              অনলাইনে প্রি-অর্ডার করুন
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Deployment Credit */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="space-y-1 text-center sm:text-left">
            <p>© ২০২৬ Tithi's Henna Artwork. All rights reserved.</p>
            <p className="text-amber-400/90 font-medium tracking-wide">
              Deployed By — <span className="font-semibold text-amber-300">MD. ISTIAK ISLAM</span>
            </p>
          </div>
          <p className="flex items-center gap-1.5 text-stone-400">
            <span>Rajshahi, Bangladesh</span>
            <span aria-hidden="true">·</span>
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
