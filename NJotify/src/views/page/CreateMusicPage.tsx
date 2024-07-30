import { useState, useEffect } from 'react';
import axios from 'axios';
import { SlCamera } from "react-icons/sl";
import style from "../../styles/page/CreateMusic.module.css";
import { PiMusicNotesSimpleFill } from "react-icons/pi";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import useUserStore from '../../state/AccountState';

interface TrackFile {
  id: number;
  name: string;
  file: File | null;
}

const CreateMusicPage = () => {
  const [tracks, setTracks] = useState<{ id: number }[]>([{ id: 1 }]);
  const [collectionType, setCollectionType] = useState('single');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [trackFiles, setTrackFiles] = useState<TrackFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const { user } = useUserStore();

  const handleAddTrack = () => {
    const newTrackId = tracks.length + 1;
    setTracks([...tracks, { id: newTrackId }]);
  };

  const handleRemoveTrack = (id: number) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(track => track.id !== id));
      setTrackFiles(trackFiles.filter(trackFile => trackFile.id !== id));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleTrackNameChange = (id: number, name: string) => {
    setTrackFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const index = newFiles.findIndex(file => file.id === id);
      if (index !== -1) {
        newFiles[index].name = name;
      } else {
        newFiles.push({ id, name, file: null });
      }
      return newFiles;
    });
  };

  const handleTrackChange = (id: number, file: File | null) => {
    setTrackFiles(prevFiles => {
      const newFiles = [...prevFiles];
      const index = newFiles.findIndex(file => file.id === id);
      if (index !== -1) {
        newFiles[index].file = file;
      } else {
        newFiles.push({ id, name: '', file });
      }
      return newFiles;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
  
    if (!title.trim()) {
      newErrors.push("Title is required.");
    }
  
    if (!image) {
      newErrors.push("Collection image is required.");
    }
  
    trackFiles.forEach(track => {
      if (!track.name.trim()) {
        newErrors.push(`Track ${track.id} name is required.`);
      }
      if (!track.file) {
        newErrors.push(`Track ${track.id} file is required.`);
      } else if (track.file && !track.file.name.endsWith('.mp3')) {
        newErrors.push(`Track ${track.id} must be an MP3 file.`);
      }
    });
  
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // const toBase64 = (file: File | null) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   if (file) {
  //       reader.readAsDataURL(file);
  //   }
  //   // @ts-ignore
  //   reader.onload = () => resolve(reader.result.split(',')[1]);
  //   reader.onerror = error => reject(error);
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }

    try {
      // let base64File = '';
      // if (image) {
      //   base64File = await toBase64(image);
      // }
    
      const formData = new FormData();
      formData.append('artist', user.Id);
      formData.append('title', title);
      formData.append('collectionType', collectionType);
      if (image) formData.append('image', image);
    
      trackFiles.forEach(track => {
        if (track.name) {
          formData.append(`trackNames[]`, track.name);
        }
        if (track.file) {
          formData.append('trackFiles[]', track.file);
        }
      });
    
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    
      const response = await axios.post('http://localhost:8888/create-music', formData)
      
      console.log('Music created successfully:', response.data);
    } catch (error) {
      console.error('Error creating music:', error);
    }

  };

  useEffect(() => {
    if (tracks.length >= 1 && tracks.length <= 3) {
      setCollectionType('Single');
    } else if (tracks.length >= 4 && tracks.length <= 6) {
      setCollectionType('Eps');
    } else if (tracks.length > 6) {
      setCollectionType('Album');
    }
  }, [tracks.length]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form onSubmit={handleSubmit}>
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
              <input id="image-upload" type="file" className={style["image-input"]} onChange={handleImageChange} />
            </div>
            <div className={`${style['flex-column']} ${style['column']} ${style['width-f']} ${style['height-f']}`}>
              <div className={`${style['flex-r']} ${style['gap-1']} ${style['mb-2']}`}>
                <div className={`${style['flex-column']} ${style['flex-5']}`}>
                  <span className={`${style['mb-sl']}`}>Title</span>
                  <input type="text" className={style.input} value={title} onChange={handleTitleChange} />
                </div>
                <div className={`${style['flex-column']} ${style['flex-1']}`}>
                  <span className={`${style['mb-sl']}`}>Collection Type</span>
                  <select className={style.input} value={collectionType} disabled>
                    <option value="Single">Singles</option>
                    <option value="Eps">Eps</option>
                    <option value="Album">Album</option>
                  </select>
                </div>
              </div>
              <span className={`${style['mb-sl']}`}>Tracks</span>
              <div className={`${style['flex-column']} ${style['gap-1']} ${style['mb-2']}`}>
              {tracks.map((track, index) => (
                <div key={track.id} className={`${style['flex-r']} ${style['gap-1']} ${style['align-center']}`}>
                  <span>#{index + 1}.</span>
                  <input
                    type="text"
                    className={`${style['input']} ${style['flex-5']}`}
                    onChange={(e) => handleTrackNameChange(track.id, e.target.value)}
                  />
                  <label htmlFor={`track-upload-${track.id}`} className={`${style['input']} ${style['flex-1']} ${style['custom-song-file']}`}>
                    Upload MP3 <PiMusicNotesSimpleFill />
                  </label>
                  <input
                    id={`track-upload-${track.id}`}
                    type="file"
                    accept=".mp3"
                    className={style['song-file']}
                    onChange={(e) => handleTrackChange(track.id, e.target.files ? e.target.files[0] : null)}
                  />
                </div>
              ))}
              </div>
              <div className={`${style['flex']} ${style['end']} ${style['gap-1']}`}>
                <button type="button" className={`${style["button"]} ${style["decline"]}`} onClick={() => handleRemoveTrack(tracks[tracks.length - 1].id)}>
                  <FaMinus />
                </button>
                <button type="button" className={`${style["button"]} ${style["accept"]}`} onClick={handleAddTrack}>
                  <FaPlus />
                </button>
              </div>
              <div className={`${style['flex']} ${style['end']} ${style['gap-1']}`}>
                <button type="button" className={style['cancel-button']}>Cancel</button>
                <button type="submit" className={style['post-button']}>Post Music</button>
              </div>
              {errors.length > 0 && (
                <div className={style.errors}>
                  {errors.map((error, index) => (
                    <p key={index} className={style.error}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMusicPage;
