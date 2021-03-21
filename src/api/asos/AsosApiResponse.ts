interface Price {
  value: number;
  text: string;
}

export interface AsosProducts {
  id: string;
  name: string;
  price: {
    current: Price;
    previous: Price;
    isMarkedDown: boolean;
  };
  brandName: string;
  productCode: number;
  url: string;
  imageUrl: string;
}

export interface AsosApiResponse {
  searchTerm: string;
  categoryName: string;
  itemCount: number;
  redirectUrl: string;
  products: AsosProducts[];
}
