export interface ClotheInfoImages {
  thumbnail: string;
  image: string;
}

export interface RelatedProducts {
  name: string;
  link: string;
  image: string;
}

export interface ClotheInfo {
  images: ClotheInfoImages[];
  description: string;
  websitesLogo: string;
  relatedProducts?: RelatedProducts[];
}
