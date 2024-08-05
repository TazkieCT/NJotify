import { GrPrevious } from "react-icons/gr";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";
import { LuMail } from "react-icons/lu";
import { FiSmartphone } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../state/AccountState";

const Notification = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);

  const [music, setMusic] = useState<number>(0);
  const [podcast, setPodcast] = useState<number>(0);
  const [follower, setFollower] = useState<number>(0);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, [setUser]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (user && user.Id) {
        try {
          const response = await axios.get(`http://localhost:8888/get-setting/${user.Id}`);
          const { music_artist, podcast, follow } = response.data.data;
          setMusic(music_artist);
          setPodcast(podcast);
          setFollower(follow);
        } catch (error) {
          console.error('Error fetching settings', error);
        }
      }
    };

    fetchSettings();
  }, [user]);

  const handleCheckboxChange = (type: string, mode: string) => {
    let newValue;

    switch (type) {
      case "music":
        if (mode === "email") {
          if (music === 1) newValue = 0;
          else if (music === 2) newValue = 3;
          else if (music === 3) newValue = 2;
          else newValue = 1;
        } else {
          if (music === 2) newValue = 0;
          else if (music === 1) newValue = 3;
          else if (music === 3) newValue = 1;
          else newValue = 2;
        }
        setMusic(newValue);
        break;

      case "podcast":
        if (mode === "email") {
          if (podcast === 1) newValue = 0;
          else if (podcast === 2) newValue = 3;
          else if (podcast === 3) newValue = 2;
          else newValue = 1;
        } else {
          if (podcast === 2) newValue = 0;
          else if (podcast === 1) newValue = 3;
          else if (podcast === 3) newValue = 1;
          else newValue = 2;
        }
        setPodcast(newValue);
        break;

      case "follower":
        if (mode === "email") {
          if (follower === 1) newValue = 0;
          else if (follower === 2) newValue = 3;
          else if (follower === 3) newValue = 2;
          else newValue = 1;
        } else {
          if (follower === 2) newValue = 0;
          else if (follower === 1) newValue = 3;
          else if (follower === 3) newValue = 1;
          else newValue = 2;
        }
        setFollower(newValue);
        break;

      default:
        break;
    }

    handleSubmit()
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8888/set-setting', {
        user_id: user.Id,
        music_artist: music,
        podcast: podcast,
        follow: follower,
      });
      console.log('Settings updated successfully', response.data);
    } catch (error) {
      console.error('Error updating settings', error);
    }
  };

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
            <span><LuMail /></span>
            <span className={`${style["small"]}`}>Email</span>
          </div>
          <div className={`${style["flex-column"]} ${style["center"]}`}>
            <span><FiSmartphone /></span>
            <span className={`${style["small"]}`}>Push</span>
          </div>
        </div>
        <div className={`${style["flex-column"]} ${style["gap-2"]}`}>
          <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
            <div className={`${style["flex-column"]}`}>
              <span className={`${style["small"]} ${style["mb-sl"]}`}>Music & Artist Recommendations</span>
              <span className={`${style["small"]}`}>Update from music and new releases from artists you follow</span>
            </div>
            <div className={`${style["flex"]} ${style["gap-cb"]} ${style["end"]}`}>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="email-music"
                  checked={music === 1 || music === 3}
                  onChange={() => handleCheckboxChange("music", "email")}
                />
                <label htmlFor="email-music"></label>
              </div>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="push-music"
                  checked={music === 2 || music === 3}
                  onChange={() => handleCheckboxChange("music", "push")}
                />
                <label htmlFor="push-music"></label>
              </div>
            </div>
          </div>
          <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
            <div className={`${style["flex-column"]}`}>
              <span className={`${style["small"]} ${style["mb-sl"]}`}>Podcast Recommendations</span>
              <span className={`${style["small"]}`}>Update from podcasts and new releases from artists you follow</span>
            </div>
            <div className={`${style["flex"]} ${style["gap-cb"]} ${style["end"]}`}>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="email-podcast"
                  checked={podcast === 1 || podcast === 3}
                  onChange={() => handleCheckboxChange("podcast", "email")}
                />
                <label htmlFor="email-podcast"></label>
              </div>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="push-podcast"
                  checked={podcast === 2 || podcast === 3}
                  onChange={() => handleCheckboxChange("podcast", "push")}
                />
                <label htmlFor="push-podcast"></label>
              </div>
            </div>
          </div>
          <div className={`${style["flex-between"]} ${style["w-full"]} ${style["center"]}`}>
            <div className={`${style["flex-column"]}`}>
              <span className={`${style["small"]} ${style["mb-sl"]}`}>Followers</span>
              <span className={`${style["small"]}`}>Update from new followers</span>
            </div>
            <div className={`${style["flex"]} ${style["gap-cb"]} ${style["end"]}`}>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="email-follower"
                  checked={follower === 1 || follower === 3}
                  onChange={() => handleCheckboxChange("follower", "email")}
                />
                <label htmlFor="email-follower"></label>
              </div>
              <div className={style["custom-checkbox"]}>
                <input
                  type="checkbox"
                  id="push-follower"
                  checked={follower === 2 || follower === 3}
                  onChange={() => handleCheckboxChange("follower", "push")}
                />
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
