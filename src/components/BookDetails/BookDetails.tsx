import { BookVolume } from '../../types/book';
import { Book, Star, Calendar, User, Bookmark, Globe } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface BookDetailsProps {
  book: BookVolume;
}

export function BookDetails({ book }: BookDetailsProps) {
  const { volumeInfo } = book;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-lg">
          {volumeInfo.imageLinks ? (
            <img
              src={volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
              alt={volumeInfo.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Book size={48} className="text-purple-300" />
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{volumeInfo.title}</h2>
          
          <div className="space-y-3">
            {volumeInfo.authors && (
              <div className="flex items-center text-gray-600">
                <User size={18} className="mr-3 text-purple-500" />
                <span>{volumeInfo.authors.join(', ')}</span>
              </div>
            )}
            
            {volumeInfo.publishedDate && (
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-3 text-blue-500" />
                <span>{formatDate(volumeInfo.publishedDate)}</span>
              </div>
            )}
            
            {volumeInfo.publisher && (
              <div className="flex items-center text-gray-600">
                <Globe size={18} className="mr-3 text-green-500" />
                <span>{volumeInfo.publisher}</span>
              </div>
            )}
            
            {volumeInfo.pageCount && (
              <div className="flex items-center text-gray-600">
                <Bookmark size={18} className="mr-3 text-orange-500" />
                <span>{volumeInfo.pageCount} pages</span>
              </div>
            )}
            
            {volumeInfo.averageRating && (
              <div className="flex items-center text-gray-600">
                <Star size={18} className="mr-3 text-yellow-500" />
                <span>{volumeInfo.averageRating} / 5 ({volumeInfo.ratingsCount} ratings)</span>
              </div>
            )}
          </div>

          {volumeInfo.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About this book</h3>
              <p className="text-gray-600 leading-relaxed">{volumeInfo.description}</p>
            </div>
          )}
          
          {volumeInfo.categories && (
            <div className="flex flex-wrap gap-2 mt-4">
              {volumeInfo.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}