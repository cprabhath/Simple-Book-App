// =========================== Search hook ================================
import { useState, useCallback } from "react";
import { BookVolume } from "../types/book";
import { searchBooks } from "../services/books";
import { toast } from "react-toastify";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setQuery("");
      setResults([]);
      return;
    }

    setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchBooks(searchQuery);
      setResults(searchResults);
    } catch (err) {
      toast.error(`${err}`);
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    query,
    results,
    loading,
    error,
    handleSearch,
  };
}
