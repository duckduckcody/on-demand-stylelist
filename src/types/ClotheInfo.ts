export interface ClotheInfoImages {
  thumbnail?: string;
  image?: string;
}

export interface RelatedProducts {
  name: string;
  link: string;
  image: string;
}

export interface ClotheInfo {
  images: ClotheInfoImages[];
  name: string;
  price: number;
  description: string;
  websiteName: string;
  websiteId: number;
  websitesLogo: string;
  link: string;
  relatedProducts?: RelatedProducts[];
  soldOut?: boolean;
}
