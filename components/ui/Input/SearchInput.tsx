"use client";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import Input from "@/ui/Input/Input";

interface SearchInputProps {
  href?: string;
}

const SearchInput: FC<SearchInputProps> = ({ href }) => {
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: href || "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router, href]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      className="bg-neutral-800"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
