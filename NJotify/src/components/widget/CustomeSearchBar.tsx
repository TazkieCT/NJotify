import style from "../../styles/widget/CustomSearchBar.module.css";
import { IoSearch } from "react-icons/io5";

const CustomSearchBar = () => {
  return (
    <div className={style.search}>
      <div className={style.icon}>
        <IoSearch/>
      </div>
      <input className={style['search-input']} type="text" placeholder={"What do you want to play?"} />
    </div>
  );
};

export default CustomSearchBar;
