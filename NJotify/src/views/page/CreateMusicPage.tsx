import { useState, useEffect } from 'react';
import { SlCamera } from "react-icons/sl";
import style from "../../styles/page/CreateMusic.module.css";
import { PiMusicNotesSimpleFill } from "react-icons/pi";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const CreateMusicPage = () => {
  const [tracks, setTracks] = useState([{ id: 1 }]);
  const [collectionType, setCollectionType] = useState('single');

  const handleAddTrack = () => {
    const newTrackId = tracks.length + 1;
    setTracks([...tracks, { id: newTrackId }]);
  };

  const handleRemoveTrack = (id: number) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(track => track.id !== id));
    }
  };

  useEffect(() => {
    if (tracks.length >= 1 && tracks.length <= 3) {
      setCollectionType('single');
    } else if (tracks.length >= 4 && tracks.length <= 6) {
      setCollectionType('eps');
    } else if (tracks.length > 6) {
      setCollectionType('album');
    }
  }, [tracks.length]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style["header"]} ${style['mb-2']}`}>
          <span className={style.title}>Create New Music</span>
        </div>
        <div className={`${style["gap-3"]} ${style['pad-content']} ${style['flex-r']}`}>
          <div>
            <label htmlFor="image-upload" className={style["custom-image-upload"]}>
              <div className={`${style['flex-column']} ${style['gray']}`}>
                <SlCamera size={100} />
                <span>Upload Collection Main Image</span>
              </div>
            </label>
            <input id="image-upload" type="file" className={style["image-input"]} />
          </div>
          <div className={`${style['flex-column']} ${style['column']} ${style['width-f']} ${style['height-f']}`}>
            <div className={`${style['flex-r']} ${style['gap-1']} ${style['mb-2']}`}>
              <div className={`${style['flex-column']} ${style['flex-5']}`}>
                <span className={`${style['mb-sl']}`}>Title</span>
                <input type="text" className={style.input} />
              </div>
              <div className={`${style['flex-column']} ${style['flex-1']}`}>
                <span className={`${style['mb-sl']}`}>Collection Type</span>
                <select className={style.input} value={collectionType} disabled>
                  <option value="single">Singles</option>
                  <option value="eps">Eps</option>
                  <option value="album">Album</option>
                </select>
              </div>
            </div>
            <span className={`${style['mb-sl']}`}>Tracks</span>
            <div className={`${style['flex-column']} ${style['gap-1']} ${style['mb-2']}`}>
              {tracks.map((track, index) => (
                <div key={track.id} className={`${style['flex-r']} ${style['gap-1']} ${style['align-center']}`}>
                  <span>#{index + 1}.</span>
                  <input type="text" className={`${style['input']} ${style['flex-5']}`} />
                  <label htmlFor={`track-upload-${track.id}`} className={`${style['input']} ${style['flex-1']} ${style['custom-song-file']}`}>
                    Upload MP3 <PiMusicNotesSimpleFill />
                  </label>
                  <input id={`track-upload-${track.id}`} type="file" className={style['song-file']} />
                </div>
              ))}
            </div>
            <div className={`${style['flex']} ${style['end']} ${style['gap-1']}`}>
              <button className={`${style["button"]} ${style["decline"]}`} onClick={() => handleRemoveTrack(tracks.length)}>
                <FaMinus />
              </button>
              <button className={`${style["button"]} ${style["accept"]}`} onClick={handleAddTrack}>
                <FaPlus />
              </button>
            </div>
            <div className={`${style['flex']} ${style['end']} ${style['gap-1']}`}>
              <button className={style['cancel-button']}>Cancel</button>
              <button className={style['post-button']}>Post Music</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMusicPage;
