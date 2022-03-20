import * as z from 'zod';

export interface ClotheItem {
  name: string;
  price: number;
  oldPrice?: number;
  link: string;
  image: string;
  fallbackImage?: string;
  website: string;
  productId?: string;
}

export const ClotheItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  oldPrice: z.number().optional(),
  link: z.string(),
  image: z.string(),
  fallbackImage: z.string().optional(),
  website: z.string(),
  productId: z.string().optional(),
});
