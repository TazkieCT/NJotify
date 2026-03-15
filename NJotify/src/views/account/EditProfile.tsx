import { GrPrevious } from "react-icons/gr";
import style from "../../styles/accountPage/SettingPage.module.css";
import useSettingStore from "../../state/SettingState";
import useUserStore from "../../state/AccountState";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";


const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EditProfile = () => {
  const changeSetting = useSettingStore((state) => state.changeSetting);
  const { user, setUser } = useUserStore();
  const [email, setEmail] = useState(user.Email || "");
  const [gender, setGender] = useState(user.Gender || "");
  const [dob, setDob] = useState(user.Dob ? formatDate(user.Dob) : "");
  const [country, setCountry] = useState(user.Country || "Country");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEmail(userData.Email);
      setGender(userData.Gender);
      setDob(formatDate(userData.Dob));
      setCountry(userData.Country);
    }
  }, [setUser]);

  const validateForm = () => {
    if (!dob) {
      setErrorMessage("Date of Birth is required.");
      return false;
    }
    
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    if (age < 13) {
      setErrorMessage("You must be at least 13 years old.");
      return false;
    }
  
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const updatedUser = {
      ...user,
      Email: email,
      Gender: gender,
      Dob: dob,
      Country: country,
    };

    const data = {
      email: updatedUser.Email,
      gender: updatedUser.Gender,
      dob: updatedUser.Dob,
      country: updatedUser.Country,
    };

    console.log(data);

    try {
      await axios.post(`${API_URL}/edit`, data);
    } catch (error) {
      setErrorMessage("Error, please try again.");
    }

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    changeSetting('menu');
  };

  const handleGender = (e: { target: { value: SetStateAction<string>; }; }) => { setGender(e.target.value) }

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
          <span className={style.small}>{user.Id}</span>
        </div>
        <div className={style.form}>
          <form className={`${style['flex-column']} ${style['mb-1']}`} onSubmit={handleSubmit}>
            <div className={`${style['mb-1']} ${style['flex-column']}`}>
              <label className={style.small} htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} className={style.input} onChange={(e) => setEmail(e.target.value)} disabled />
            </div>
            <div className={`${style['mb-1']} ${style['flex-column']}`}>
              <label className={style.small} htmlFor="gender">Gender:</label>
              <select 
                id="gender" 
                name="gender" 
                value={gender} 
                className={style.input} 
                onChange={handleGender} 
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className={`${style['mb-1']} ${style['flex']}`}>
              <div className={`${style['flex-column']} ${style['mr-1']} ${style['dob-container']}`}>
                <label className={style.small} htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={dob} className={`${style.input} ${style['calender']}`} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className={`${style['flex-column']} ${style['country-container']}`}>
                <label className={style.small} htmlFor="country">Country:</label>
                <select id="country" name="country" className={style.input} value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="Country" hidden>Country</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="singapore">Singapore</option>
                  <option value="us">United Kingdom</option>
                </select>
              </div>
            </div>
            {errorMessage && <span className={style["error-message"]}>{errorMessage}</span>}
            <button type="submit" className={style['submit-button']}>Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
