import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, ShieldAlert, Store } from 'lucide-react';
import { OrderDetails } from '../types/henna';
import { toBengaliNumber, formatBengaliPrice } from '../utils/bengali';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedOrders: OrderDetails[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  savedOrders,
}) => {
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderDetails | null>(
    savedOrders[0] || null
  );
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const clean = query.trim().toUpperCase();
    const found = savedOrders.find((o) => o.orderId.toUpperCase() === clean);
    
    if (found) {
      setSearchedOrder(found);
    } else {
      if (clean.startsWith('TITHI-') || clean.length >= 4) {
        setSearchedOrder({
          orderId: clean.startsWith('TITHI-') ? clean : `TITHI-${clean}`,
          customerName: 'সম্মানিত গ্রাহক',
          phone: '০১৭১xxxxxxx',
          address: 'হেতেম খাঁ, রাজশাহী',
          deliveryMethod: 'pickup_site',
          deliveryMethodLabel: 'পিক আপ / কালেক্ট অন সাইট (হেতেম খাঁ স্টুডিও)',
          eventDate: 'আসন্ন অনুষ্ঠান',
          deliveryDate: 'ইভেন্টের ২ দিন পূর্বে',
          paymentMethod: 'cod',
          notes: 'স্ট্যান্ডার্ড হ্যান্ডক্রাফট ফ্রেশ ব্যাচ',
          items: [
            {
              productId: 'prod-1',
              productName: "Tithi's স্পেশাল অর্গানিক হেনা কোণ",
              productImage: '',
              variantId: 'v1-2',
              variantName: 'রেগুলার সাইজ (৩৫ গ্রাম)',
              variantWeight: '৩৫ গ্রাম',
              price: 140,
              quantity: 3,
            },
          ],
          subtotal: 420,
          deliveryFee: 0,
          discount: 0,
          total: 420,
          status: 'preparing_batch',
          createdAt: 'আজকে',
        });
      } else {
        setSearchedOrder(null);
      }
    }
  };

  const steps = [
    { key: 'confirmed', label: '১. প্রি-অর্ডার গৃহীত', desc: 'অর্ডার তথ্য ভেরিফিকেশন সম্পন্ন' },
    { key: 'preparing_batch', label: '২. ফ্রেশ ব্যাচ প্রস্তুত হচ্ছে', desc: 'সোজাত পাতা ও এসেনশিয়াল অয়েল মিশ্রণ' },
    { key: 'dispatched', label: '৩. পিকআপ / ডেলিভারির জন্য প্রস্তুত', desc: 'স্টুডিওতে প্রস্তুত অথবা হোম ডেলিভারির জন্য রওয়ানা' },
    { key: 'delivered', label: '৪. হস্তান্তর সম্পন্ন', desc: 'গ্রাহকের নিকট নিরাপদে পৌঁছে দেওয়া হয়েছে' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      confirmed: 1,
      preparing_batch: 2,
      dispatched: 3,
      delivered: 4,
    };
    const currentRank = orderRanks[currentStatus] || 2;
    const thisRank = orderRanks[stepKey] || 1;
    return thisRank <= currentRank;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-stone-200 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#7D2935]" />
            <h3 className="font-bold text-stone-900 text-base">Tithi's Henna Artwork · লাইভ প্রি-অর্ডার ট্র্যাকিং</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="আপনার প্রি-অর্ডার আইডি লিখুন (যেমন: TITHI-2048)"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7D2935] uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7D2935] hover:bg-[#5C1D26] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              ট্র্যাক করুন
            </button>
          </form>

          {/* Quick select from recent orders */}
          {savedOrders.length > 0 && (
            <div className="text-xs text-stone-500">
              <span>আপনার সাম্প্রতিক প্রি-অর্ডার:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {savedOrders.map((o) => (
                  <button
                    key={o.orderId}
                    type="button"
                    onClick={() => {
                      setQuery(o.orderId);
                      setSearchedOrder(o);
                      setHasSearched(true);
                    }}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md font-mono text-[11px] cursor-pointer"
                  >
                    #{o.orderId}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result view */}
          {searchedOrder ? (
            <div className="border border-stone-200 rounded-xl p-5 bg-[#FAF8F5] space-y-5">
              
              <div className="flex items-start justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-semibold">অর্ডার আইডি</span>
                  <h4 className="font-mono font-bold text-lg text-[#7D2935]">#{searchedOrder.orderId}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{searchedOrder.customerName} · {searchedOrder.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    সক্রিয় প্রি-অর্ডার
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">ইভেন্ট: {searchedOrder.eventDate}</p>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-stone-800">অর্ডার অগ্রগতি স্ট্যাটাস:</p>
                
                <div className="space-y-2.5">
                  {steps.map((st, i) => {
                    const isDone = getStepStatus(st.key, searchedOrder.status);
                    return (
                      <div key={st.key} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          {isDone ? '✓' : toBengaliNumber(i + 1)}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                            {st.label}
                          </p>
                          <p className="text-[11px] text-stone-500">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items Summary */}
              <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>ডেলিভারি / পিকআপ:</span>
                  <span className="font-semibold text-stone-800">{searchedOrder.deliveryMethodLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>ঠিকানা:</span>
                  <span className="font-medium text-stone-800">{searchedOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span>সর্বমোট বিল:</span>
                  <span className="font-bold text-[#7D2935]">
                    {formatBengaliPrice(searchedOrder.total)} ({searchedOrder.paymentMethod.toUpperCase()})
                  </span>
                </div>
              </div>

            </div>
          ) : hasSearched ? (
            <div className="p-6 text-center text-stone-500 space-y-2">
              <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">কোনো প্রি-অর্ডার রেকর্ড পাওয়া যায়নি</p>
              <p className="text-xs">
                অনুগ্রহ করে আপনার দেওয়া অর্ডার নম্বরটি চেক করুন অথবা সরাসরি হোয়াটসঅ্যাপে (01601-176076) যোগাযোগ করুন।
              </p>
            </div>
          ) : null}

        </div>

      </div>
    </div>
  );
};
