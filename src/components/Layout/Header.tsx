import { SearchBar } from "../SearchBar";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-5xl text-white">
          <span className="font-bold">Hey, </span>
          {getTimeGreeting()} {" "}
          </h1>
        </div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
}
