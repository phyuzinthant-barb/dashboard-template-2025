import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  title: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ title }) => {
  const [params, setParams] = useSearchParams();
  const searchParam = params.get("search") || "";
  const [inputValue, setInputValue] = useState(searchParam);

  // Create debounced handleSearch only once
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const newParams = new URLSearchParams(params);
      if (term) {
        newParams.set("search", term);
      } else {
        newParams.delete("search");
      }
      setParams(newParams);
    }, 300),
    [params, setParams]
  );

  useEffect(() => {
    setInputValue(searchParam);
  }, [searchParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    debouncedSearch("");
  };

  return (
    <div className="flex w-[450px]">
      <Input
        placeholder={title}
        value={inputValue}
        onChange={handleChange}
        className="bg-white rounded-e-none"
      />
      <Button onClick={handleClear} className="rounded-l-none -ms-3 h-11">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
