import { BookVolume } from '../types/book';
import { Book, Calendar, User } from 'lucide-react';

interface BookCardProps {
  book: BookVolume;
  onClick: (book: BookVolume) => void;
  isActive?: boolean;
}

export function BookCard({ book, onClick, isActive = false }: BookCardProps) {
  const { volumeInfo } = book;

  const truncateTitle = (title: string): string => {
    const words = title.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : title;
  };

  return (
    <div
      className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer
        ${
          isActive
            ? "scale-105 shadow-2xl z-10"
            : "hover:shadow-xl hover:-translate-y-1"
        }`}
      onClick={() => onClick(book)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {volumeInfo.imageLinks ? (
          <img
            src={volumeInfo.imageLinks.thumbnail.replace("http:", "https:")}
            alt={volumeInfo.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <Book size={48} className="text-purple-300" />
          </div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        />
      </div>
      <div className="p-5">
        <h3
          className="font-bold text-lg line-clamp-2 mb-3 transition-colors duration-300"
          title={volumeInfo.title}
        >
          {truncateTitle(volumeInfo.title)}
        </h3>
        <div className="space-y-2.5">
          {volumeInfo.authors && (
            <div className="flex items-center text-sm text-gray-600">
              <User size={16} className="mr-2.5 text-purple-400" />
              <span className="line-clamp-1">
                {volumeInfo.authors.join(", ")}
              </span>
            </div>
          )}
          {volumeInfo.publishedDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2.5 text-blue-400" />
              <span>{volumeInfo.publishedDate != null ? new Date(volumeInfo.publishedDate).getFullYear() : "2024"}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}