import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '8801601176076'; // 01601-176076

  const quickQuestions = [
    'আসসালামু আলাইকুম তিতি আপু! আমি অর্গানিক মেহেদি কোণ অর্ডার করতে চাই।',
    'রাজশাহী শহরে ব্রাইডাল/সেমি-ব্রাইডাল হোম সার্ভিসের চার্জ ও বুকিং জানতে চাই।',
    'মেহেদি কি হেতেম খাঁ স্টুডিও থেকে সরাসরি পিক আপ করা যাবে?',
    'আসন্ন বিয়ের জন্য ফ্রেশ অর্গানিক ব্যাচের প্রি-অর্ডার করতে চাই।',
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const text = customText || 'আসসালামু আলাইকুম Tithi\'s Henna Artwork! আমি অর্গানিক মেহেদি / ব্রাইডাল বুকিং সম্পর্কে জানতে চাচ্ছি।';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      
      {/* WhatsApp Chat Popup Box */}
      {isOpen && (
        <div className="mb-3 w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg border border-white/30">
                🌸
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Tithi's Henna Artwork</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                  <span>অনলাইনে আছেন · দ্রুত রিপ্লাই পাবেন</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#EFEAE2] space-y-3 max-h-72 overflow-y-auto">
            {/* Incoming message bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-2xs text-xs text-stone-800 space-y-1 max-w-[90%]">
              <p className="font-semibold text-[#128C7E]">তিতি (Henna Artist):</p>
              <p className="leading-relaxed">
                আসসালামু আলাইকুম! স্বাগতম Tithi's Henna Artwork-এ। পুরো রাজশাহী শহরে হোম সার্ভিস ও ১০০% অর্গানিক মেহেদি কোণ সরবরাহ করছি। কীভাবে সাহায্য করতে পারি?
              </p>
              <p className="text-[10px] text-stone-400 text-right mt-1">০১৬০১-১৭৬০৭৬</p>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-stone-600 px-1">
                দ্রুত প্রশ্ন নির্বাচন করুন:
              </p>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(q)}
                  className="w-full text-left p-2 rounded-xl bg-white/90 hover:bg-white border border-stone-200 text-xs text-stone-700 hover:text-[#128C7E] transition-all hover:scale-101 cursor-pointer flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-2">{q}</span>
                  <Send className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#128C7E] shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Direct WhatsApp Link */}
          <div className="p-3 bg-white border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-500 font-medium">
              হোয়াটসঅ্যাপ: <strong>01601-176076</strong>
            </span>
            <button
              onClick={() => handleOpenWhatsApp()}
              className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>চ্যাট শুরু করুন</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করুন"
        className="whatsapp-pulse flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white py-2.5 px-4 rounded-full shadow-lg transition-transform cursor-pointer group"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-white" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold leading-tight">হোয়াটসঅ্যাপে মেসেজ দিন</p>
          <p className="text-[10px] text-white/90 font-medium">01601-176076</p>
        </div>
      </button>

    </div>
  );
};
