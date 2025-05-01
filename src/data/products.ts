import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Denim Jacket',
    price: 89.99,
    salePrice: 69.99,
    onSale: true,
    description: 'A timeless denim jacket that never goes out of style. Made with premium denim for durability and comfort. The perfect layering piece for any outfit.',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7679734/pexels-photo-7679734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7679740/pexels-photo-7679740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'clothes',
    colors: [
      { name: 'Blue', hex: '#1E40AF' },
      { name: 'Black', hex: '#171717' },
      { name: 'Light Blue', hex: '#60A5FA' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 124,
    features: [
      '100% premium cotton denim',
      'Button closure',
      'Multiple pockets',
      'Adjustable cuffs'
    ],
    inStock: true,
    new: false,
    tags: ['denim', 'jacket', 'casual', 'everyday']
  },
  {
    id: '2',
    name: 'Premium Leather Sneakers',
    price: 129.99,
    salePrice: 0,
    onSale: false,
    description: 'Handcrafted premium leather sneakers that combine style and comfort. The cushioned insole and durable outsole make these perfect for all-day wear.',
    images: [
      'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'shoes',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#171717' },
      { name: 'Brown', hex: '#92400E' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviewCount: 89,
    features: [
      'Genuine leather upper',
      'Cushioned insole',
      'Rubber outsole',
      'Breathable design'
    ],
    inStock: true,
    new: true,
    tags: ['sneakers', 'leather', 'comfortable', 'casual']
  },
  {
    id: '3',
    name: 'Designer Tote Bag',
    price: 199.99,
    salePrice: 159.99,
    onSale: true,
    description: 'A spacious and elegant tote bag designed for the modern woman. Features multiple compartments to keep your essentials organized in style.',
    images: [
      'https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'bags',
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Tan', hex: '#D4A076' },
      { name: 'Red', hex: '#DC2626' }
    ],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 56,
    features: [
      'Genuine leather',
      'Interior zip pocket',
      'Magnetic closure',
      'Adjustable straps'
    ],
    inStock: true,
    new: false,
    tags: ['tote', 'designer', 'elegant', 'spacious']
  },
  {
    id: '4',
    name: 'Cashmere Sweater',
    price: 149.99,
    salePrice: 0,
    onSale: false,
    description: 'Luxuriously soft cashmere sweater that provides exceptional warmth and comfort. Perfect for layering during colder months.',
    images: [
      'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6046538/pexels-photo-6046538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'clothes',
    colors: [
      { name: 'Cream', hex: '#FEFBF3' },
      { name: 'Gray', hex: '#6B7280' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Burgundy', hex: '#9F1239' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 42,
    features: [
      '100% pure cashmere',
      'Ribbed collar and cuffs',
      'Relaxed fit',
      'Dry clean only'
    ],
    inStock: true,
    new: true,
    tags: ['sweater', 'cashmere', 'luxurious', 'winter']
  },
  {
    id: '5',
    name: 'Running Performance Shoes',
    price: 119.99,
    salePrice: 89.99,
    onSale: true,
    description: 'Engineered for maximum performance and comfort, these running shoes feature responsive cushioning and breathable mesh to keep you going mile after mile.',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'shoes',
    colors: [
      { name: 'Blue', hex: '#1E40AF' },
      { name: 'Black', hex: '#171717' },
      { name: 'Red', hex: '#DC2626' },
      { name: 'Gray', hex: '#6B7280' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.6,
    reviewCount: 78,
    features: [
      'Responsive cushioning',
      'Breathable mesh upper',
      'Durable rubber outsole',
      'Reflective details for visibility'
    ],
    inStock: true,
    new: false,
    tags: ['running', 'athletic', 'performance', 'comfortable']
  },
  {
    id: '6',
    name: 'Leather Backpack',
    price: 169.99,
    salePrice: 0,
    onSale: false,
    description: 'A stylish and functional leather backpack with ample storage for your daily essentials. Perfect for work, travel, or everyday use.',
    images: [
      'https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6698493/pexels-photo-6698493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'bags',
    colors: [
      { name: 'Brown', hex: '#92400E' },
      { name: 'Black', hex: '#171717' },
      { name: 'Tan', hex: '#D4A076' }
    ],
    sizes: ['One Size'],
    rating: 4.7,
    reviewCount: 63,
    features: [
      'Genuine full-grain leather',
      'Padded laptop compartment',
      'Multiple interior pockets',
      'Adjustable straps'
    ],
    inStock: true,
    new: true,
    tags: ['backpack', 'leather', 'travel', 'durable']
  },
  {
    id: '7',
    name: 'Silk Blouse',
    price: 99.99,
    salePrice: 79.99,
    onSale: true,
    description: 'Elegant silk blouse that transitions effortlessly from office to evening. The lightweight fabric drapes beautifully for a flattering fit.',
    images: [
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/10453945/pexels-photo-10453945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/14616338/pexels-photo-14616338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'clothes',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#171717' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Burgundy', hex: '#9F1239' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviewCount: 37,
    features: [
      '100% pure silk',
      'Button closure',
      'Relaxed fit',
      'Dry clean only'
    ],
    inStock: true,
    new: false,
    tags: ['blouse', 'silk', 'elegant', 'office wear']
  },
  {
    id: '8',
    name: 'Dress Boots',
    price: 189.99,
    salePrice: 0,
    onSale: false,
    description: 'Handcrafted leather dress boots that combine classic style with modern comfort. These versatile boots can be dressed up or down for any occasion.',
    images: [
      'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5214139/pexels-photo-5214139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6046235/pexels-photo-6046235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'shoes',
    colors: [
      { name: 'Brown', hex: '#92400E' },
      { name: 'Black', hex: '#171717' },
      { name: 'Burgundy', hex: '#9F1239' }
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviewCount: 52,
    features: [
      'Genuine leather upper',
      'Leather sole',
      'Goodyear welt construction',
      'Cushioned insole'
    ],
    inStock: true,
    new: false,
    tags: ['boots', 'dress shoes', 'leather', 'formal']
  },
  {
    id: '9',
    name: 'Crossbody Handbag',
    price: 149.99,
    salePrice: 129.99,
    onSale: true,
    description: 'A versatile crossbody handbag that keeps your essentials secure and accessible. The adjustable strap allows for comfortable all-day wear.',
    images: [
      'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'bags',
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Brown', hex: '#92400E' },
      { name: 'Red', hex: '#DC2626' },
      { name: 'Green', hex: '#059669' }
    ],
    sizes: ['One Size'],
    rating: 4.6,
    reviewCount: 45,
    features: [
      'Genuine leather',
      'Multiple compartments',
      'Adjustable strap',
      'Gold-tone hardware'
    ],
    inStock: true,
    new: true,
    tags: ['crossbody', 'handbag', 'leather', 'versatile']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.rating >= 4.7 || product.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (currentProduct: Product, limit = 4): Product[] => {
  return products
    .filter((product) => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       product.tags?.some(tag => currentProduct.tags?.includes(tag)))
    )
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerms = query.toLowerCase().split(' ');
  
  return products.filter((product) => {
    const searchableText = [
      product.name.toLowerCase(),
      product.description.toLowerCase(),
      product.category.toLowerCase(),
      ...(product.tags || []).map(tag => tag.toLowerCase()),
    ].join(' ');
    
    return searchTerms.some(term => searchableText.includes(term));
  });
};