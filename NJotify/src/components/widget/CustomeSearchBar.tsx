import { ChangeEvent, useEffect, useState } from "react";
import usePageStore from "../../state/PageState";
import style from "../../styles/widget/CustomSearchBar.module.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CustomSearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // useEffect(() => {
  //   if (searchText) {
  //     navigate("/result");
  //   } else {
  //     navigate("search");
  //   }
  // })

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
