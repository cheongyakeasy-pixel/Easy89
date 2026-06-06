export interface RealEstateNewsItem {
  id: string;
  title: string;
  summary: string;
  press: string;
  publishedAtText: string;
  url: string;
  imageUrl?: string;
}

export interface RealEstateNewsResponse {
  source: {
    name: string;
    url: string;
  };
  updatedAt: string;
  items: RealEstateNewsItem[];
  message?: string;
}
