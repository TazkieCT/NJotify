import React from 'react';
import style from "../../styles/widget/Skeleton.module.css";

const AlbumCardSkeleton: React.FC = () => {
  return (
    <div className={style.albumCardSkeleton}>
      <div className={style.image}></div>
      <div className={style.info}>
        <div className={style.title}></div>
        <div className={style.artist}></div>
      </div>
    </div>
  );
}

export default AlbumCardSkeleton;
