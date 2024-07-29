import React, { useEffect } from 'react';
import AlbumCard from "../../components/widget/AlbumCard";
import ArtistCard from "../../components/widget/ArtistCard";
import useUserStore from "../../state/AccountState";
import style from "../../styles/page/ProfilePage.module.css";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src="https://guitar.com/wp-content/uploads/2019/10/keshi-hero-image-credit-press@1400x1050.jpg" className={style['profile-image']} alt="" />
          </div>
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
