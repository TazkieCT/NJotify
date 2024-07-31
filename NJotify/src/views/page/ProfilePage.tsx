import React, { useEffect, useRef, useState } from 'react';
import AlbumCard from "../../components/widget/AlbumCard";
import ArtistCard from "../../components/widget/ArtistCard";
import useUserStore from "../../state/AccountState";
import style from "../../styles/page/ProfilePage.module.css";
import axios from 'axios';
import { HiOutlinePencil } from 'react-icons/hi2';

const toBase64 = (file: File): Promise<string> => 
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserStore();
  const [profileImage, setProfileImage] = useState("https://guitar.com/wp-content/uploads/2019/10/keshi-hero-image-credit-press@1400x1050.jpg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      try {
        const base64File = await toBase64(file);
        
        const data = {
          user_id: user.Id,
          image: base64File,
        };
  
        console.log(data);
    
        const response = await axios.post("http://localhost:8888/edit-profile", data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          setProfileImage(`data:image/jpeg;base64,${base64File}`);
        } else {
          console.error("Failed to update profile image");
        }

        console.log(response.data);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']} onClick={handleAvatarClick}>
            <img src={profileImage} className={style['profile-image']} alt="" />
            <div className={style['change-avatar']}>
              <span className={style['medium']}><HiOutlinePencil/></span>
              <span>Change Avatar</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
          />
          <div className={style['profile-info']}>
            <span className={`${style.small} ${style['mb-2']}`}>Profile</span>
            <span className={`${style.title} ${style['mb-sl']}`}>{user.Username}</span>
            <span className={style.small}>4 Public · 15 Followers · 14 Following</span>
          </div>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Public Playlist</span>
          </div>
          <div className={style.flex}>
            {/* <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/> */}
          </div>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Following</span>
          </div>
          <div className={style.flex}>
            <ArtistCard/>
          </div>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Followers</span>
          </div>
          <div className={style.flex}>
            <ArtistCard/>
          </div>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Mutual Following</span>
          </div>
          <div className={style.flex}>
            <ArtistCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
