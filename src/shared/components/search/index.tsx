import { useState } from "react";
import type { SearchBarProps } from "./types";
import { useDebounce } from "../../hooks/use-debounce";
import Input from "../input";
import Stack from "../stack";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, width, height, placeholder }) => {
  const [searchText, setSearchText] = useState("");

  useDebounce(searchText, 400, onSearch);

  return (
    <Stack width={width} height={height}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Stack>
  );
};

export default SearchBar;
