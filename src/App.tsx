import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { CategorySection } from './components/CategorySection/CategorySection';
import { SearchResults } from './components/Search/SearchResults';
import { Modal } from './components/Modal/Modal';
import { BookDetails } from './components/BookDetails/BookDetails';
import { FEATURED_CATEGORIES } from './services/books';
import { BookVolume } from './types/book';
import { useSearch } from './hook/useSearch';
import { ToastContainer } from "react-toastify";

function App() {
  const [selectedBook, setSelectedBook] = useState<BookVolume | null>(null);
  const { query, results, loading, error, handleSearch } = useSearch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onSearch={handleSearch} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {query && (
          <SearchResults
            query={query}
            results={results}
            loading={loading}
            error={error}
            onBookClick={setSelectedBook}
          />
        )}

        {!query && FEATURED_CATEGORIES.map((category) => (
          <CategorySection
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
            description={category.description}
            onBookClick={setSelectedBook}
          />
        ))}
      </main>

      <Modal 
        isOpen={selectedBook !== null}
        onClose={() => setSelectedBook(null)}
      >
        {selectedBook && <BookDetails book={selectedBook} />}
      </Modal>
    </div>
  );
}

export default App;