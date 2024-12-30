// ====================== Types for Books ===========================
export interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    categories?: string[];
    pageCount?: number;
    averageRating?: number;
    ratingsCount?: number;
    publisher?: string;
  };
}