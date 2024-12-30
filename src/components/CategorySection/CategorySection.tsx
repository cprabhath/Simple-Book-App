import { useState, useEffect } from 'react';
import { BookSlider } from '../BookSlider/BookSlider';
import { LoadingSpinner } from '../Layout/LoadingSpinner';
import { getBooksByCategory } from '../../services/books';
import { BookVolume } from '../../types/book';
import { toast } from "react-toastify";

interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  description: string;
  onBookClick: (book: BookVolume) => void;
}

export function CategorySection({ categoryId, categoryName, description, onBookClick }: CategorySectionProps) {
  const [books, setBooks] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const results = await getBooksByCategory(categoryId);
        setBooks(results);
      } catch (err) {
        setError('Failed to load books for this category.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [categoryId]);

  if (loading) return <LoadingSpinner />;
  if (error) toast.error(`${error}`);

  return (
    <BookSlider
      title={categoryName}
      description={description}
      books={books}
      onBookClick={onBookClick}
    />
  );
}