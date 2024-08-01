import React, { ChangeEvent, useEffect, useState } from "react";
import useSearchStore from "../../state/SearchState";
import style from "../../styles/widget/CustomSearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../state/DebounceSearch";

const CustomSearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { search, setSearch } = useSearchStore();
  const debouncedSearch = useDebounce(searchText, 500);

  React.useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    setSearchText(search);
  }, [search]);

  // useEffect(() => {
  //   setSearch(searchText);
  // }, [searchText, setSearch]);

  useEffect(() => {
    if (searchText) {
      navigate("/result");
    } else {
      navigate("/search");
    }
  }, [searchText, navigate]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={style.search}>
      <div className={style.icon}>
        <IoSearch />
      </div>
      <input
        className={style['search-input']}
        type="text"
        placeholder={"What do you want to play?"}
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomSearchBar;
