export interface ClotheInfoImages {
  thumbnail: string;
  image: string;
}

export interface ClotheInfo {
  images: ClotheInfoImages[];
  description: string | undefined;
  websitesLogo?: string | undefined;
}
