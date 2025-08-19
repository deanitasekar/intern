import { Input } from "@/components/input.component";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search",
  className = "",
  onSearch,
}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div
      className={`
        relative flex items-center w-full max-w-[277px]
        bg-white 
        shadow-sm
        border border-gray-200
        ${className}
      `}
      style={{
        height: "44px",
        borderRadius: "40px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
      <Input
        type="search"
        placeholder={placeholder}
        className="
          w-full border-0 
          bg-transparent 
          text-gray-700
          placeholder:text-gray-400
          focus-visible:ring-0 focus-visible:ring-offset-0
          focus:ring-0 focus:ring-offset-0
          px-0 py-0
          text-sm
          font-normal
          shadow-none
          outline-none
        "
        style={{
          height: "20px",
          lineHeight: "20px",
        }}
        onChange={handleInputChange}
      />
    </div>
  );
}
