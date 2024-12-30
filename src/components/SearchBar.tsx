import React, { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please Enter a Book name to search 😒");
      return;
    }
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-full px-6 py-4 pl-14 text-gray-900 bg-white/90 backdrop-blur-sm border-2 border-white/20 rounded-xl shadow-lg focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
        />
        <Search
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors"
          size={20}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}
