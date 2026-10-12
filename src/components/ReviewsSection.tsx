import React, { useState } from 'react';
import { Star, CheckCircle, Plus, MessageSquare, ThumbsUp, X, Sparkles, Filter } from 'lucide-react';
import { Review } from '../types/henna';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formProduct, setFormProduct] = useState('নকশী প্রিমিয়াম অর্গানিক হেনা কোণ');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === filterRating);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      customerName: formName,
      city: formCity || 'ঢাকা',
      productName: formProduct,
      rating: formRating,
      date: 'আজকে',
      comment: formComment,
      verified: true,
    };

    onAddReview(newRev);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setFormName('');
      setFormCity('');
      setFormComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-[#7D2935] font-semibold">
              সত্যিকারের গ্রাহক মূল্যায়ন
            </p>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              আমাদের মেহেদি ব্যবহারকারীদের অভিজ্ঞতা
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl">
              সারা দেশের কনে, মেহেদিপ্রেমী ও আর্টিস্টদের শতভাগ ভেরিফায়েড রিভিউ। আপনিও আপনার অভিজ্ঞতা শেয়ার করতে পারেন।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#7D2935] hover:bg-[#5C1D26] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>আপনার রিভিউ লিখুন</span>
            </button>
          </div>
        </div>

        {/* Rating Score Board & Filter Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Aggregate Score */}
            <div className="md:col-span-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-6">
              <div className="text-4xl sm:text-5xl font-bold text-stone-900 font-serif-luxury tabular-nums">
                ৪.৯৫
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-stone-500">
                  ৩৪০+ ভেরিফায়েড গ্রাহকের মধ্যে ৯৯.২% পজিটিভ ফিডব্যাক
                </p>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="md:col-span-8 flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-500 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span>ফিল্টার:</span>
              </span>
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterRating === 'all'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                সব রিভিউ ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating(5)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  filterRating === 5
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>৫ স্টার</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
              <button
                onClick={() => setFilterRating(4)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  filterRating === 4
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>৪ স্টার</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            </div>

          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs hover:border-[#7D2935]/30 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Review Header: User & Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-stone-900 text-sm sm:text-base">
                        {rev.customerName}
                      </h4>
                      {rev.verified && (
                        <span className="text-[11px] text-[#2D5337] flex items-center gap-0.5 font-medium">
                          <CheckCircle className="w-3 h-3" />
                          <span>ভেরিফায়েড ক্রেতা</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                      <span>{rev.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-500 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Product Tag */}
                <p className="text-[11px] text-[#7D2935] font-medium bg-[#7D2935]/5 inline-block px-2 py-0.5 rounded">
                  {rev.productName}
                </p>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>১০-১২ দিন স্থায়ী সুন্দর খয়েরি আভা</span>
                <span className="text-emerald-700 font-medium">১০০% অর্গানিক সন্তুষ্টি</span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#7D2935]" />
                  <span>আপনার মতামত / রিভিউ লিখুন</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">ধন্যবাদ!</h4>
                  <p className="text-xs text-stone-600">
                    আপনার সুন্দর রিভিউটি সফলভাবে জমা হয়েছে এবং তালিকায় যুক্ত করা হয়েছে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="যেমন: তানিয়া সুলতানা"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        শহর / জেলা
                      </label>
                      <input
                        type="text"
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        placeholder="যেমন: ঢাকা, সিলেট, রাজশাহী"
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      যে প্রোডাক্টটি ব্যবহার করেছেন
                    </label>
                    <select
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935] bg-white"
                    >
                      <option value="নকশী প্রিমিয়াম অর্গানিক হেনা কোণ">নকশী প্রিমিয়াম অর্গানিক হেনা কোণ</option>
                      <option value="রয়্যাল ব্রাইডাল হেনা কিট">রয়্যাল ব্রাইডাল হেনা কিট</option>
                      <option value="খাঁটি সোজাত রাজস্থানি অর্গানিক হেনা পাউডার">খাঁটি সোজাত রাজস্থানি অর্গানিক হেনা পাউডার</option>
                      <option value="অ্যারোমাটিক ডার্ক স্টেন হেনা এসেনশিয়াল অয়েল">অ্যারোমাটিক ডার্ক স্টেন হেনা এসেনশিয়াল অয়েল</option>
                    </select>
                  </div>

                  {/* Rating selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      রেটিং নির্বাচন করুন
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1 cursor-pointer focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= formRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-stone-500 font-semibold ml-2">
                        {formRating} স্টার
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      আপনার মন্তব্য / অভিজ্ঞতা *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="মেহেদির রঙ, মসৃণতা ও সুবাস কেমন ছিলো লিখুন..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#7D2935] hover:bg-[#5C1D26] rounded-lg shadow-2xs"
                    >
                      রিভিউ প্রকাশ করুন
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
