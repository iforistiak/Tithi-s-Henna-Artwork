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

  // Shopping Cart: MUST start empty [] for new visitors so cart shows 0 (zero)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tithi_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
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
    return [];
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string>('ORGANIC10');

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
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

  // Instant order from product card
  const handleInstantOrder = (product: Product, variant: ProductVariant) => {
    handleAddToCart(product, variant);
    setIsOrderOpen(true);
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#7B1E34] selection:text-white">
      {/* Navbar without tracking button */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenOrder={() => setIsOrderOpen(true)}
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Product Catalog & Size Variants */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onInstantOrder={handleInstantOrder}
          onViewProductDetails={(p) => setDetailProduct(p)}
        />

        {/* Quality & Ingredients Transparency */}
        <QualitySection />

        {/* Customer Live Gallery Slider */}
        <CustomerSlider
          slides={slides}
          onUpdateSlides={(newSlides) => setSlides(newSlides)}
        />

        {/* Portfolio & Design Showcase */}
        <PortfolioGallery
          onOrderForDesign={() => setIsOrderOpen(true)}
        />

        {/* Customer Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={(newRev) => setReviews([newRev, ...reviews])}
        />

        {/* Events, Workshops & Special Offers */}
        <EventsOffers
          onOrderClick={() => setIsOrderOpen(true)}
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
        onProceedToCheckout={() => setIsOrderOpen(true)}
        couponCode={appliedCoupon}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Order Checkout Modal */}
      <PreOrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
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
                  quantity: 1,
                },
              ]
        }
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onOrder={handleInstantOrder}
      />

      {/* Mobile-Friendly Quick Bottom Navigation */}
      <MobileBottomBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Floating WhatsApp Action Button (01601-176076) */}
      <FloatingWhatsApp />

      {/* Footer without tracking link */}
      <Footer
        onOpenOrder={() => setIsOrderOpen(true)}
      />
    </div>
  );
}
