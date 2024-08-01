import { useEffect, useState, useRef } from "react";
import style from "../../styles/layoutPage/HeaderBar.module.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import usePageStore from "../../state/PageState";
import CustomSearchBar from "../widget/CustomSearchBar";
import { PiArrowSquareOut } from "react-icons/pi";
import useSettingStore from "../../state/SettingState";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../state/AccountState";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const page = usePageStore((state) => state.page);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const changeSetting = useSettingStore((state) => state.changeSetting);
  const { user } = useUserStore();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (menuRef.current && !menuRef.current.contains(target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleClickRightBar = (content: string) => {
    navigate(content);
    setIsMenuOpen(false);
  };

  const logout = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        localStorage.removeItem("user");
    }
    navigate("login");
    setIsMenuOpen(false);
  };

  const handleManageAccountClick = () => {
    changeSetting('menu');
    window.open('/settings', '_blank');
  };

  const previousPage = () => {
    navigate(-1);
  }

  const nextPage = () => {
    navigate(1);
  }

  return (
    <div className={`${style.header} ${style['flex-between']}`}>
      <div className={style.flex}>
        <span className={style['page-button']} onClick={previousPage}><GrPrevious/></span>
        <span className={style['page-button']} onClick={nextPage}><GrNext/></span>
        {(page === "search" || page === "result") && (
          <CustomSearchBar/>
        )}
      </div>
      <div className={style['profile-container']} ref={menuRef}>
        <div className={style['profile-button']} onClick={toggleMenu}>
          <img src={`http://localhost:8888/${user.Profile}`} className={style['profile-icon']} alt="Profile Icon" />
        </div>
        {isMenuOpen && (
          <div className={style['profile-menu']}>
            <div className={style['menu-item']} onClick={() => {handleClickRightBar("profile")}}>Profile</div>
            <div className={style['menu-item']} onClick={handleManageAccountClick}>Manage Account <span className={style['box-icon']}><PiArrowSquareOut/></span></div>
            <hr className={style.hr}/>
            <div className={style['menu-item']} onClick={() => {logout()}}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;
