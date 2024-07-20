import { ChangeEvent, useEffect, useState } from "react";
import usePageStore from "../../state/PageState";
import style from "../../styles/widget/CustomSearchBar.module.css";
import { IoSearch } from "react-icons/io5";

const CustomSearchBar = () => {
  const changePage = usePageStore((state) => state.changePage)
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText) {
      changePage("result");
    } else {
      changePage("search");
    }
  })

  return (
    <div className={style.search}>
      <div className={style.icon}>
        <IoSearch/>
      </div>
      <input className={style['search-input']} type="text" placeholder={"What do you want to play?"} value={searchText}
        onChange={handleInputChange}/>
    </div>
  );
};

export default CustomSearchBar;
