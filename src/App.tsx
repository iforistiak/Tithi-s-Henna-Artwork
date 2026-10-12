/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QualitySection } from './components/QualitySection';
import { ProductCatalog } from './components/ProductCatalog';
import { CustomerSlider } from './components/CustomerSlider';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { EventsOffers } from './components/EventsOffers';
import { CartDrawer } from './components/CartDrawer';
import { PreOrderModal } from './components/PreOrderModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

import {
  INITIAL_PRODUCTS,
  INITIAL_SLIDES,
  INITIAL_REVIEWS,
} from './data/hennaData';
import { Product, ProductVariant, CartItem, CustomerSlide, Review, OrderDetails } from './types/henna';

export default function App() {
  // Products
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Customer Slides (Persistent in localStorage)
  const [slides, setSlides] = useState<CustomerSlide[]>(() => {
    try {
      const saved = localStorage.getItem('tithi_customer_slides');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SLIDES;
  });

  // Reviews (Persistent)
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('tithi_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // Shopping Cart (Persistent)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tithi_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Pre-populate with 2 regular cones
    return [
      {
        productId: 'prod-1',
        productName: "Tithi's স্পেশাল অর্গানিক হেনা কোণ",
        productImage: INITIAL_PRODUCTS[0].image,
        variantId: 'v1-2',
        variantName: 'রেগুলার কোণ (Standard)',
        variantWeight: '৩৫ গ্রাম',
        price: 140,
        quantity: 2,
      },
    ];
  });

  // Orders history (Persistent)
  const [savedOrders, setSavedOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('tithi_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        orderId: 'TITHI-2048',
        customerName: 'তানজিলা ইসলাম',
        phone: '০১৬০১-১৭৬০৭৬',
        email: 'jinnatislamtithi@gmail.com',
        address: 'হেতেম খাঁ, মহিলা কলেজ রোড, রাজশাহী',
        deliveryMethod: 'pickup_site',
        deliveryMethodLabel: 'পিক আপ / কালেক্ট অন সাইট (হেতেম খাঁ স্টুডিও)',
        eventDate: '২০২৬-১১-০৫',
        deliveryDate: '২০২৬-১১-০৩',
        paymentMethod: 'cod',
        notes: 'ব্রাইডাল ফ্রেশ ব্যাচ স্টুডিও থেকে পিক আপ',
        items: [
          {
            productId: 'prod-2',
            productName: "Tithi's রয়্যাল ব্রাইডাল হেনা কিট",
            productImage: INITIAL_PRODUCTS[1].image,
            variantId: 'v2-2',
            variantName: 'রয়্যাল ব্রাইডাল কিট',
            variantWeight: 'কমপ্লিট ব্রাইডাল সেট',
            price: 1150,
            quantity: 1,
          },
        ],
        subtotal: 1150,
        deliveryFee: 0,
        discount: 115,
        total: 1035,
        status: 'preparing_batch',
        createdAt: '১০ অক্টোবর ২০২৬',
      },
    ];
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string>('ORGANIC10');

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Sync slides to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tithi_customer_slides', JSON.stringify(slides));
    } catch (e) {
      console.error(e);
    }
  }, [slides]);

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tithi_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tithi_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tithi_orders', JSON.stringify(savedOrders));
    } catch (e) {
      console.error(e);
    }
  }, [savedOrders]);

  // Cart actions
  const handleAddToCart = (product: Product, variant: ProductVariant) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.variantId === variant.id
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.variantId === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          variantId: variant.id,
          variantName: variant.name,
          variantWeight: variant.weight,
          price: variant.price,
          quantity: 1,
        },
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId && item.variantId === variantId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  // Instant pre-order from a single card
  const handleInstantPreOrder = (product: Product, variant: ProductVariant) => {
    handleAddToCart(product, variant);
    setIsPreOrderOpen(true);
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    if (code === 'ORGANIC10' || code === 'MEHENDI10' || code === 'EID2026') {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;

  // Order created
  const handleOrderSuccess = (newOrder: OrderDetails) => {
    setSavedOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#7D2935] selection:text-white">
      {/* Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPreOrder={() => setIsPreOrderOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        activeSection="home"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPreOrder={() => setIsPreOrderOpen(true)}
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Catalog & Size Variants */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onInstantPreOrder={handleInstantPreOrder}
          onViewProductDetails={(p) => setDetailProduct(p)}
        />

        {/* Quality & Ingredients Transparency */}
        <QualitySection />

        {/* Customer Live Gallery Slider (Editable with Custom Links) */}
        <CustomerSlider
          slides={slides}
          onUpdateSlides={(newSlides) => setSlides(newSlides)}
        />

        {/* Portfolio & Design Showcase */}
        <PortfolioGallery
          onPreOrderForDesign={() => setIsPreOrderOpen(true)}
        />

        {/* Customer Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={(newRev) => setReviews([newRev, ...reviews])}
        />

        {/* Events, Workshops & Special Offers */}
        <EventsOffers
          onPreOrderClick={() => setIsPreOrderOpen(true)}
          onApplyCouponToCart={(code) => {
            setAppliedCoupon(code);
            setIsCartOpen(true);
          }}
        />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsPreOrderOpen(true)}
        couponCode={appliedCoupon}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Pre-Order Checkout Modal with WhatsApp and Email Notifications */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
        cartItems={
          cartItems.length > 0
            ? cartItems
            : [
                {
                  productId: products[0].id,
                  productName: products[0].name,
                  productImage: products[0].image,
                  variantId: products[0].variants[1].id,
                  variantName: products[0].variants[1].name,
                  variantWeight: products[0].variants[1].weight,
                  price: products[0].variants[1].price,
                  quantity: 2,
                },
              ]
        }
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        savedOrders={savedOrders}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onPreOrder={handleInstantPreOrder}
      />

      {/* Mobile-Friendly Quick Bottom Navigation */}
      <MobileBottomBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPreOrder={() => setIsPreOrderOpen(true)}
      />

      {/* Floating WhatsApp Action Button (01601-176076) */}
      <FloatingWhatsApp />

      {/* Footer with Rajshahi & Tithi's Henna Artwork Info */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenPreOrder={() => setIsPreOrderOpen(true)}
      />
    </div>
  );
}
