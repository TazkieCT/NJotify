import { useEffect, useState } from "react";
import style from "../../styles/layoutPage/HeaderBar.module.css"
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import usePageStore from "../../state/PageState";
// import { IoSearch } from "react-icons/io5";
import CustomSearchBar from "../widget/CustomeSearchBar";

const HeaderBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const page = usePageStore((state) => state.page)

  // BELUM BISA
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${style.header} ${style['flex-between']} ${isScrolled ? style.scrolled : ''}`}>
        <div className={style.flex}>
          <span className={style['page-button']}><GrPrevious/></span>
          <span className={style['page-button']}><GrNext/></span>
          {page === "search" && (
            <CustomSearchBar/>
          )}
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Vd_kqZn53ok20t0tVuAukGAHOzVLWvNgKw&s" className={style['profile-icon']} alt="" />
    </div>
  )
}

export default HeaderBar