import { BookVolume } from '../../types/book';
import { BookCard } from '../BookCard';
import { LoadingSpinner } from '../Layout/LoadingSpinner';
import { Search } from 'lucide-react';
import { toast } from "react-toastify";

interface SearchResultsProps {
  query: string;
  results: BookVolume[];
  loading: boolean;
  error: string | null;
  onBookClick: (book: BookVolume) => void;
}

export function SearchResults({ query, results, loading, error, onBookClick }: SearchResultsProps) {
  if (!query) return null;
  if (loading) return <LoadingSpinner />;
  if (error) toast.error(`${error}`);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Search size={48} className="mb-4 text-gray-400" />
        <p className="text-lg">No books found for "{query}"</p>
        <p className="text-sm mt-2">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Search Results for "{query}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={onBookClick}
          />
        ))}
      </div>
    </div>
  );
}