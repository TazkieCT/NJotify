import { GrPrevious } from "react-icons/gr";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";
import { SlCamera } from "react-icons/sl";

const GetVerified = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);

  return (
    <>
      <div className={style["flex-column"]}>
        <div className={`${style.flex} ${style["mb-1"]}`}>
          <span className={style["back-button"]} onClick={() => changeSetting("menu")}>
            <GrPrevious />
          </span>
        </div>
        <span className={`${style.title} ${style["mb-1"]} ${style["bold"]}`}>
          Get Verified
        </span>
        <div className={`${style["flex"]} ${style["gap-1"]}`}>
          <div className={style["flex-column"]}>
            <label htmlFor="file-upload" className={style["custom-file-upload"]}>
              <div className={`${style['flex-column']} ${style['gray']}`}>
                <SlCamera size={100} />
                <span>Upload Banner Image</span>
              </div>
            </label>
            <input id="file-upload" type="file" className={`${style['image-input']} ${style["file-input"]}`} />
          </div>
          <div className={`${style["flex-column"]} ${style.between} ${style['w-full']}`}>
            <div className={`${style["flex-column"]}`}>
              <span className={style.small}>Current Role:</span>
              <span className={`${style.small} ${style["mb-1"]} ${style["bold"]}`}>
                Listener
              </span>
            </div>
            <div className={style.form}>
              <form className={`${style["flex-column"]} ${style["mb-1"]}`}>
                <div className={`${style["mb-1"]} ${style["flex-column"]}`}>
                  <label className={style.small} htmlFor="about">
                    About You
                  </label>
                  <textarea id="about" name="about" className={`${style["input"]}`} rows={5}/>
                </div>
              </form>
            </div>
            <button type="submit" className={style["submit-button"]}>
              Get Verified
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetVerified;
