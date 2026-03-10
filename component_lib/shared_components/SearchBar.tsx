import { TextField, InputAdornment } from "@mui/material";
import React, { useState, KeyboardEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const executeSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search movies"
      size="small"
      value={searchTerm}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ cursor: "pointer" }} onClick={executeSearch} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: "background.paper",
            borderRadius: 1,
            "& fieldset": { border: "none" },
          },
        },
      }}
      sx={{}}
    />
  );
}
