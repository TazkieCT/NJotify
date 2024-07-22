import { GrPrevious } from "react-icons/gr";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";
import { LuMail } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";

const Notification = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);

  return (
    <>
      <div className={style["flex-column"]}>
        <div className={`${style.flex} ${style["mb-1"]}`}>
          <span className={style["back-button"]} onClick={() => changeSetting("menu")}>
            <GrPrevious />
          </span>
        </div>
        <span className={`${style.title} ${style["bold"]} ${style["mb-sl"]}`}>
          Notification settings
        </span>
        <span className={`${style["small"]} ${style["mb-1"]}`}>Pick the notification you want to get via push or email. These preferences only apply to push and email.</span>
        <div className={`${style["flex"]} ${style["gap-1"]} ${style["end"]} ${style["mb-1"]}`}>
          <div className={`${style["flex-column"]} ${style["center"]}`}>
            <span><LuMail/></span>
            <span className={`${style["small"]}`}>Email</span>
          </div>
          <div className={`${style["flex-column"]} ${style["center"]}`}>
            <span><FiSmartphone/></span>
            <span className={`${style["small"]}`}>Push</span>
          </div>
        </div>
        <div className={`${style["flex-column"]} ${style["gap-2"]}`}>
            <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
                <div className={`${style["flex-column"]}`}>
                    <span className={`${style["small"]} ${style["mb-sl"]}`}>Music & Artist Recommendations</span>
                    <span className={`${style["small"]}`}>Update from music and new releases from artists you follow</span>
                </div>
                <div className={`${style["flex"]} ${style["gap-cb"]} ${style['']} ${style["end"]}`}>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="email-music" />
                        <label htmlFor="email-music"></label>
                    </div>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="push-music" />
                        <label htmlFor="push-music"></label>
                    </div>
                </div>
            </div>
            <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
                <div className={`${style["flex-column"]}`}>
                    <span className={`${style["small"]} ${style["mb-sl"]}`}>Podcast Recommendations</span>
                    <span className={`${style["small"]}`}>Update from podcasts and new releases from artists you follow</span>
                </div>
                <div className={`${style["flex"]} ${style["gap-cb"]} ${style['']} ${style["end"]}`}>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="email-podcast" />
                        <label htmlFor="email-podcast"></label>
                    </div>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="push-podcast" />
                        <label htmlFor="push-podcast"></label>
                    </div>
                </div>
            </div>
            <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
                <div className={`${style["flex-column"]}`}>
                    <span className={`${style["small"]} ${style["mb-sl"]}`}>Followers</span>
                    <span className={`${style["small"]}`}>Update from new followers</span>
                </div>
                <div className={`${style["flex"]} ${style["gap-cb"]} ${style['']} ${style["end"]}`}>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="email-follower" />
                        <label htmlFor="email-follower"></label>
                    </div>
                    <div className={style["custom-checkbox"]}>
                        <input type="checkbox" id="push-follower" />
                        <label htmlFor="push-follower"></label>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
