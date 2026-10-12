export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'cones' | 'bridal' | 'powder_oil' | 'care';
  description: string;
  stainTone: string;
  shelfLife: string;
  ingredients: string[];
  image: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  inStock: boolean;
  freshBatchDate: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  variantName: string;
  variantWeight: string;
  price: number;
  quantity: number;
}

export interface CustomerSlide {
  id: string;
  imageUrl: string;
  customerName: string;
  occasion: string;
  stainDay: string;
  customLink: string;
  linkText: string;
  caption: string;
}

export interface Review {
  id: string;
  customerName: string;
  city: string;
  productName: string;
  rating: number;
  date: string;
  comment: string;
  imageUrl?: string;
  verified: boolean;
}

export interface EventOffer {
  id: string;
  type: 'offer' | 'workshop' | 'bridal_slot';
  title: string;
  tagline: string;
  validUntil: string;
  code?: string;
  discountBadge?: string;
  description: string;
  actionText: string;
}

export type DeliveryMethodType = 'rajshahi_home' | 'pickup_site' | 'outside_rajshahi';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  deliveryMethod: DeliveryMethodType;
  deliveryMethodLabel: string;
  eventDate: string;
  deliveryDate: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  notes: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'preparing_batch' | 'dispatched' | 'delivered';
  createdAt: string;
}
