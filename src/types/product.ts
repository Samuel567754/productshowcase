export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  description: string;
  images: string[];
  category: 'clothes' | 'shoes' | 'bags';
  colors?: Color[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  features?: string[];
  inStock: boolean;
  new?: boolean;
  tags?: string[];
}

export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  onSale?: boolean;
  inStock?: boolean;
  sortBy?: 'price-low-high' | 'price-high-low' | 'newest' | 'rating';
}