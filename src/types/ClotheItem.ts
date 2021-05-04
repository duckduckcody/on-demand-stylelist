export interface ClotheItem {
  name: string;
  price: number;
  discountedPrice?: number;
  link: string;
  image: string;
  fallbackImage?: string;
  website: string;
  productId?: string;
  error?: unknown;
}
