import { GrPrevious } from "react-icons/gr";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";

const EditProfile = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);

  return (
    <>
      <div className={style['flex-column']}>
        <div className={`${style.flex} ${style['mb-1']}`}>
          <span className={style['back-button']} onClick={() => changeSetting('menu')}>
            <GrPrevious />
          </span>
        </div>
        <span className={`${style.title} ${style['mb-1']} ${style['bold']}`}>Edit Profile</span>
        <div className={`${style['mb-1']} ${style['flex-column']} ${style['gap-sm']}`}>
          <span className={style.small}>ID User:</span>
          <span className={style.small}>1YU9-SAJD-21JH-DS82</span>
        </div>
        <div className={style.form}>
          <form className={`${style['flex-column']} ${style['mb-1']}`}>
            <div className={`${style['mb-1']} ${style['flex-column']}`}>
              <label className={style.small} htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className={style.input} />
            </div>
            <div className={`${style['mb-1']} ${style['flex-column']}`}>
              <label className={style.small} htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" className={style.input}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={`${style['mb-1']} ${style['flex']}`}>
              <div className={`${style['flex-column']} ${style['mr-1']} ${style['dob-container']}`}>
                <label className={style.small} htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" className={`${style.input} ${style['calender']}`} />
              </div>
              <div className={`${style['flex-column']} ${style['country-container']}`}>
                <label className={style.small} htmlFor="country">Country:</label>
                <select id="country" name="country" className={style.input}>
                <option value="indonesia">Indonesia</option>
                <option value="singapore">Singapore</option>
                <option value="us">United Kingdom</option>
              </select>
              </div>
            </div>
            <button type="submit" className={style['submit-button']}>Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
