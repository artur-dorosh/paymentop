export interface Book {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  description: string;
  isTopSeller: boolean;
  cover?: string;
}
