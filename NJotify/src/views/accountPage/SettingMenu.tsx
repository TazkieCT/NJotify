import { MdArrowForwardIos } from "react-icons/md";
import { RiShoppingBasketLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi2";
import { BsCheckLg } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { TbBell } from "react-icons/tb";
import { IoArrowForward } from "react-icons/io5";
import style from "../../styles/accountPage/SettingPage.module.css";

const SettingMenu = () => {
  return (
    <>
    <div className={`${style['section']} ${style['mb-1']}`}>
        <div className={`${style['title']} ${style['mb-1']}`}>
        Account
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><RiShoppingBasketLine/></span>Order History</div>
        <MdArrowForwardIos/>
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><HiOutlinePencil/></span>Edit Profile</div>
        <MdArrowForwardIos/>
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><BsCheckLg/></span>Get Verified</div>
        <MdArrowForwardIos/>
        </div>
    </div>
    <div className={`${style['section']} ${style['mb-1']}`}>
        <div className={`${style['title']} ${style['mb-1']}`}>
        Security & Privacy
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><FiLock/></span>Change Password</div>
        <MdArrowForwardIos/>
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><TbBell/></span>Notification Setting</div>
        <MdArrowForwardIos/>
        </div>
        <div className={`${style['flex-between']} ${style['menu']}`}>
        <div className={style['menu-item']}><span className={style['medium']}><IoArrowForward/></span>Sign Out</div>
        <MdArrowForwardIos/>
        </div>
    </div>
    </>
  )
}

export default SettingMenu