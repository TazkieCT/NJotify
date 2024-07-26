import { GrPrevious } from "react-icons/gr";
import { SlCamera } from "react-icons/sl";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";
import useUserStore from "../../state/AccountState";
import { useEffect, useState } from "react";
import axios from "axios";

const GetVerified = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);
  const { user, setUser } = useUserStore();
  const [file, setFile] = useState<File | null>(null);
  const [about, setAbout] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!file) {
      setErrorMessage("Banner image is required.");
      return false;
    }
    if (!about.trim()) {
      setErrorMessage("About you is required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const toBase64 = (file: File | null) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
    // @ts-ignore
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      let base64File = '';
      if (file) {
        base64File = await toBase64(file);
      }

      const data = {
        user_id: user.Id,
        banner: base64File,
        about: about
      };

      console.log(data);
  
      const response = await axios.post("http://localhost:8888/verify", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      changeSetting("menu");
    } catch (error) {
      setErrorMessage("Error, please try again.");
      console.error("Verification error:", error);
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
            <input 
              id="file-upload" 
              type="file" 
              className={`${style['image-input']} ${style["file-input"]}`} 
              onChange={handleFileChange}
            />
          </div>
          <div className={`${style["flex-column"]} ${style.between} ${style['w-full']}`}>
            <div className={`${style["flex-column"]}`}>
              <span className={style.small}>Current Role:</span>
              <span className={`${style.small} ${style["mb-1"]} ${style["bold"]}`}>
                {user.Role}
              </span>
            </div>
            <div className={style.form}>
              <form className={`${style["flex-column"]} ${style["gap-1"]}`} onSubmit={handleSubmit}>
                <div className={`${style["mb-1"]} ${style["flex-column"]}`}>
                  <label className={style.small} htmlFor="about">
                    About You
                  </label>
                  <textarea 
                    id="about" 
                    name="about" 
                    className={`${style["input"]}`} 
                    rows={5}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                {errorMessage && <span className={style["error-message"]}>{errorMessage}</span>}
                <button type="submit" className={style["submit-button"]}>
                  Get Verified
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetVerified;

