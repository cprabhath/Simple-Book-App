import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookVolume } from '../../types/book';
import { BookCard } from '../BookCard';

interface BookSliderProps {
  title: string;
  description: string;
  books: BookVolume[];
  onBookClick: (book: BookVolume) => void;
}

export function BookSlider({ title, description, books, onBookClick }: BookSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-white/90 shadow-lg text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {books.map((book) => (
            <div 
              key={book.id} 
              className="flex-none w-[250px]"
              onMouseEnter={() => setActiveBookId(book.id)}
              onMouseLeave={() => setActiveBookId(null)}
            >
              <BookCard 
                book={book} 
                onClick={onBookClick}
                isActive={activeBookId === book.id}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-white/90 shadow-lg text-gray-600 hover:text-gray-900 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}