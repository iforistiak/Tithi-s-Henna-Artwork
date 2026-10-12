import React, { useState } from 'react';
import { X, Calendar, MapPin, Phone, User, CheckCircle2, ShoppingBag, Truck, CreditCard, Sparkles, Printer, Mail, MessageCircle, Store, Send } from 'lucide-react';
import { CartItem, OrderDetails, DeliveryMethodType } from '../types/henna';
import { toBengaliNumber, formatBengaliPrice } from '../utils/bengali';

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onOrderSuccess: (order: OrderDetails) => void;
  defaultEventDate?: string;
}

export const PreOrderModal: React.FC<PreOrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onOrderSuccess,
  defaultEventDate = '',
}) => {
  // Form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType>('rajshahi_home');
  const [eventDate, setEventDate] = useState(defaultEventDate);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [notes, setNotes] = useState('');

  // Confirmation state
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee calculation
  const getDeliveryFee = (method: DeliveryMethodType): number => {
    switch (method) {
      case 'pickup_site':
        return 0; // Free pickup on-site at Hetemkha studio
      case 'rajshahi_home':
        return 60; // Rajshahi city doorstep delivery
      case 'outside_rajshahi':
        return 130; // Outside Rajshahi courier
      default:
        return 60;
    }
  };

  const deliveryFee = getDeliveryFee(deliveryMethod);
  const grandTotal = Math.max(0, subtotal - discountAmount) + deliveryFee;

  const getDeliveryMethodLabel = (method: DeliveryMethodType): string => {
    switch (method) {
      case 'pickup_site':
        return 'পিক আপ / কালেক্ট অন সাইট (হেতেম খাঁ, মহিলা কলেজ রোড স্টুডিও)';
      case 'rajshahi_home':
        return 'রাজশাহী সিটিতে হোম ডেলিভারি (ক্যাশ অন ডেলিভারি)';
      case 'outside_rajshahi':
        return 'রাজশাহীর বাইরে সারা বাংলাদেশে কুরিয়ার ক্যাশ অন ডেলিভারি';
    }
  };

  // Compile WhatsApp & Email message templates (Changed to [নতুন অর্ডার])
  const compileOrderText = (order: OrderDetails) => {
    const itemsList = order.items
      .map(
        (it) =>
          `• ${it.productName} (${it.variantName}) x ${toBengaliNumber(it.quantity)} = ${formatBengaliPrice(it.price * it.quantity)}`
      )
      .join('\n');

    return `🌸 [নতুন অর্ডার] Tithi's Henna Artwork
━━━━━━━━━━━━━━━━━━━━
অর্ডার আইডি: #${order.orderId}
তারিখ: ${order.createdAt}

👤 গ্রাহকের তথ্য:
• নাম: ${order.customerName}
• মোবাইল: ${order.phone}
${order.email ? `• ইমেইল: ${order.email}\n` : ''}• ডেলিভারি মাধ্যম: ${order.deliveryMethodLabel}
• ঠিকানা: ${order.address}

📅 ইভেন্ট ও ডেলিভারি তথ্য:
• অনুষ্ঠান/বিয়ের তারিখ: ${order.eventDate}
• কাঙ্ক্ষিত ডেলিভারি তারিখ: ${order.deliveryDate}
• পেমেন্ট মেথড: ${order.paymentMethod.toUpperCase()} (${order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod})
${order.notes ? `• বিশেষ নোট: ${order.notes}\n` : ''}
🛒 পণ্যের তালিকা:
${itemsList}

💰 আর্থিক বিবরণ:
• সাবটোটাল: ${formatBengaliPrice(order.subtotal)}
• ছাড়: ${formatBengaliPrice(order.discount)}
• ডেলিভারি/পিকআপ ফি: ${formatBengaliPrice(order.deliveryFee)}
• সর্বমোট প্রদেয়: ${formatBengaliPrice(order.total)}
━━━━━━━━━━━━━━━━━━━━
নোটিফিকেশন প্রাপক: তিতি (01601-176076 / jinnatislamtithi@gmail.com)`;
  };

  const handleSendToWhatsApp = (order: OrderDetails) => {
    const text = compileOrderText(order);
    const url = `https://wa.me/8801601176076?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendToEmail = (order: OrderDetails) => {
    const text = compileOrderText(order);
    const subject = `[নতুন অর্ডার] #${order.orderId} - ${order.customerName} (${formatBengaliPrice(order.total)})`;
    const mailtoUrl = `mailto:jinnatislamtithi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('অনুগ্রহ করে নাম এবং মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    if (deliveryMethod !== 'pickup_site' && !address.trim()) {
      alert('অনুগ্রহ করে ডেলিভারি ঠিকানা পূরণ করুন।');
      return;
    }

    if (cartItems.length === 0) {
      alert('আপনার শপিং ব্যাগে কোনো পণ্য নেই। অনুগ্রহ করে পণ্য যোগ করে অর্ডার করুন।');
      return;
    }

    const orderId = `TITHI-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderDetails = {
      orderId,
      customerName,
      phone,
      email: email.trim(),
      address: deliveryMethod === 'pickup_site' ? 'হেতেম খাঁ, মহিলা কলেজ রোড স্টুডিও থেকে পিক-আপ' : address,
      deliveryMethod,
      deliveryMethodLabel: getDeliveryMethodLabel(deliveryMethod),
      eventDate: eventDate || 'উৎসবে ব্যবহার্য',
      deliveryDate: deliveryDate || 'ইভেন্টের ২ দিন পূর্বে',
      paymentMethod,
      notes,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total: grandTotal,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);

    // Auto-trigger WhatsApp notification
    setTimeout(() => {
      handleSendToWhatsApp(newOrder);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#541222] to-[#7B1E34] text-white p-4 sm:p-6 flex items-center justify-between">
          <div>
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tithi's Henna Artwork · অর্ডার সিস্টেম</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              {confirmedOrder ? 'অর্ডার সফল হয়েছে!' : 'অনলাইনে অর্ডার ও বুকিং ফরম'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          
          {confirmedOrder ? (
            /* Order Receipt / Success State */
            <div className="space-y-6 text-stone-800">
              
              {/* Notification Banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>অর্ডার সফলভাবে সম্পন্ন হয়েছে!</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  আপনার অর্ডারের পূর্ণ বিবরণ সরাসরি তিতির হোয়াটসঅ্যাপ নম্বর (<strong>01601-176076</strong>) এবং ইমেইল (<strong>jinnatislamtithi@gmail.com</strong>)-এ পাঠানোর ব্যবস্থা রাখা হয়েছে।
                </p>

                {/* 1-click notification action buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleSendToWhatsApp(confirmedOrder)}
                    className="px-3.5 py-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>হোয়াটসঅ্যাপে পাঠান (01601-176076)</span>
                  </button>

                  <button
                    onClick={() => handleSendToEmail(confirmedOrder)}
                    className="px-3.5 py-2 bg-[#7B1E34] hover:bg-[#541222] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>ইমেইলে পাঠান (jinnatislamtithi@gmail.com)</span>
                  </button>
                </div>
              </div>

              {/* Order Receipt */}
              <div className="border border-[#EAE4DC] rounded-2xl p-4 sm:p-5 bg-[#FAF8F5] space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">অর্ডার নম্বর:</span>
                  <span className="font-bold text-[#7B1E34] font-mono">#{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">গ্রাহকের নাম:</span>
                  <span className="font-semibold">{confirmedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">মোবাইল:</span>
                  <span className="font-semibold">{confirmedOrder.phone}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">ডেলিভারি / পিকআপ পদ্ধতি:</span>
                  <span className="font-semibold text-right max-w-xs text-[#22543D]">
                    {confirmedOrder.deliveryMethodLabel}
                  </span>
                </div>
                {confirmedOrder.deliveryMethod !== 'pickup_site' && (
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
                    <span className="font-medium text-right max-w-xs">{confirmedOrder.address}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">অনুষ্ঠান বা বিয়ের তারিখ:</span>
                  <span className="font-semibold text-[#7B1E34]">{confirmedOrder.eventDate}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">পেমেন্ট মেথড:</span>
                  <span className="font-semibold">
                    {confirmedOrder.paymentMethod === 'cod' && 'ক্যাশ অন ডেলিভারি / পিক-আপের সময় পরিশোধ'}
                    {confirmedOrder.paymentMethod === 'bkash' && 'বিকাশ পেমেন্ট'}
                    {confirmedOrder.paymentMethod === 'nagad' && 'নগদ পেমেন্ট'}
                  </span>
                </div>

                {/* Items List */}
                <div className="pt-2">
                  <p className="font-bold text-stone-800 mb-2">পণ্য তালিকা:</p>
                  <div className="space-y-1.5">
                    {confirmedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-stone-600 text-xs">
                        <span>{it.productName} ({it.variantName}) x {toBengaliNumber(it.quantity)}</span>
                        <span className="font-semibold">{formatBengaliPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals in Bengali */}
                <div className="pt-3 border-t border-stone-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>সাবটোটাল</span>
                    <span>{formatBengaliPrice(confirmedOrder.subtotal)}</span>
                  </div>
                  {confirmedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>কুপন ছাড়</span>
                      <span>-{formatBengaliPrice(confirmedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>ডেলিভারি / পিকআপ চার্জ</span>
                    <span>{confirmedOrder.deliveryFee === 0 ? 'ফ্রি (৳০)' : formatBengaliPrice(confirmedOrder.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#7B1E34] pt-2 border-t border-stone-200">
                    <span>সর্বমোট মূল্য</span>
                    <span className="text-lg">{formatBengaliPrice(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>রিসিপ্ট প্রিন্ট / সেভ</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#7B1E34] to-[#541222] rounded-xl shadow-2xs cursor-pointer"
                >
                  সম্পন্ন করুন
                </button>
              </div>

            </div>
          ) : (
            /* Order Entry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Items in cart */}
              <div className="p-3 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl flex items-center justify-between text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#7B1E34]" />
                  <span>অর্ডার ব্যাগে আছে: <strong>{toBengaliNumber(cartItems.reduce((s, i) => s + i.quantity, 0))} টি পণ্য</strong></span>
                </div>
                <span className="font-bold text-[#7B1E34]">
                  {formatBengaliPrice(Math.max(0, subtotal - discountAmount))}
                </span>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    আপনার পূর্ণ নাম *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: নুসরাত জাহান"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="০১৬০১-১৭৬০৭৬"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34]"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  আপনার ইমেইল (ঐচ্ছিক - কনফার্মেশন পাওয়ার জন্য)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34]"
                  />
                </div>
              </div>

              {/* Delivery / Pickup Method Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ডেলিভারি অথবা পিক-আপ পদ্ধতি নির্বাচন করুন *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Option 1: Pickup on Site */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup_site')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'pickup_site'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 ring-1 ring-[#7B1E34]'
                        : 'border-[#EAE4DC] hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mb-0.5">
                      <Store className="w-3.5 h-3.5 text-[#7B1E34]" />
                      <span>পিক আপ / কালেক্ট অন সাইট</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-bold">চার্জ: ফ্রি (৳০)</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">মহিলা কলেজ রোড, হেতেম খাঁ স্টুডিও</p>
                  </button>

                  {/* Option 2: Rajshahi Home Delivery */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('rajshahi_home')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'rajshahi_home'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 ring-1 ring-[#7B1E34]'
                        : 'border-[#EAE4DC] hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mb-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#22543D]" />
                      <span>রাজশাহী সিটি হোম ডেলিভারি</span>
                    </div>
                    <p className="text-[11px] text-stone-700 font-semibold">ক্যাশ অন ডেলিভারি: ৳৬০</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">বাসায় পৌঁছে মূল্য পরিশোধ</p>
                  </button>

                  {/* Option 3: Outside Rajshahi Courier */}
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('outside_rajshahi')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'outside_rajshahi'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 ring-1 ring-[#7B1E34]'
                        : 'border-[#EAE4DC] hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>সারাদেশে কুরিয়ার</span>
                    </div>
                    <p className="text-[11px] text-stone-700 font-semibold">ডেলিভারি ফি: ৳১৩০</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">কুরিয়ার ক্যাশ অন ডেলিভারি</p>
                  </button>

                </div>
              </div>

              {/* Delivery Address */}
              {deliveryMethod !== 'pickup_site' ? (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড, এলাকা) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="যেমন: বাড়ি #৪, রোড #২, উপশহর / কাজলা, রাজশাহী"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                  <Store className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">স্টুডিও পিক-আপ ঠিকানা:</span>
                    <p>মহিলা কলেজ রোড, হেতেম খাঁ, রাজশাহী। পণ্য প্রস্তুত হলে তিতি সরাসরি কল দিয়ে জানিয়ে দিবেন।</p>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    অনুষ্ঠান বা ব্যবহারের তারিখ *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    পণ্য হাতে পেতে চান কোন তারিখে?
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  মূল্য পরিশোধের পদ্ধতি
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-bold transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 text-[#7B1E34]'
                        : 'border-[#EAE4DC] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    ক্যাশ অন ডেলিভারি / পিকআপ
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-bold transition-all ${
                      paymentMethod === 'bkash'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 text-[#7B1E34]'
                        : 'border-[#EAE4DC] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    বিকাশ (bKash)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-bold transition-all ${
                      paymentMethod === 'nagad'
                        ? 'border-[#7B1E34] bg-[#7B1E34]/5 text-[#7B1E34]'
                        : 'border-[#EAE4DC] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    নগদ (Nagad)
                  </button>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  বিশেষ নির্দেশনা বা হোম সার্ভিসের বিস্তারিত (যদি থাকে)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="যেমন: ব্রাইডাল হোম সার্ভিসের জন্য সময়, অতিরিক্ত পিন টিপ লাগবে..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-[#EAE4DC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B1E34]"
                />
              </div>

              {/* Notification Guarantee Note */}
              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600 space-y-1">
                <p className="font-bold text-stone-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#7B1E34]" />
                  <span>সরাসরি নোটিফিকেশন সিস্টেম:</span>
                </p>
                <p>
                  অর্ডার কনফার্ম করার সাথে সাথে স্বয়ংক্রিয়ভাবে একটি কপি তিতির হোয়াটসঅ্যাপ (01601-176076) এবং ইমেইলে (jinnatislamtithi@gmail.com) প্রেরণের ব্যবস্থা করা আছে।
                </p>
              </div>

              {/* Grand Total & Submit */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">সর্বমোট প্রদেয়:</span>
                  <p className="text-xl sm:text-2xl font-bold text-[#7B1E34]">
                    {formatBengaliPrice(grandTotal)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#7B1E34] to-[#541222] hover:from-[#8D233C] hover:to-[#611628] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm cursor-pointer"
                  >
                    অর্ডার কনফার্ম করুন
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
