// ======================== Google Books API =======================================
const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// ========================== Search function ======================================
export async function searchBooks(query: string) {
  const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=12`);
  const data = await response.json();
  return data.items || [];
}
// ================================ Categorize the Books ===========================
export async function getBooksByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}?q=subject:${encodeURIComponent(category)}&orderBy=relevance&maxResults=10`);
  const data = await response.json();
  return data.items || [];
}

// ======================= Default Categories for the books ========================
export const FEATURED_CATEGORIES = [
  { id: 'fiction', name: 'Fiction', description: 'Best-selling novels and stories' },
  { id: 'science', name: 'Science', description: 'Discover the wonders of science' },
  { id: 'biography', name: 'Biography', description: 'Inspiring life stories' },
] as const;