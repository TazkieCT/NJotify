import { useEffect, useState } from 'react';
import style from '../../styles/widget/RightBarContent.module.css';
import axios from 'axios';
import { API_URL } from '../../config/api';

interface TrackInfo {
  track_id: string;
  track_name: string;
}

interface NextQueueProps {
  track: TrackInfo | null;
  artistName: string | undefined;
}

const NextQueue: React.FC<NextQueueProps> = ({ track, artistName }) => {
  if (!track) {
    return <span className={style['no-next-track']}>No more tracks in queue</span>;
  }
  const [album, setAlbum] = useState<albumCard>();

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-album-track/${track.track_id}`);
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Error fetching album!", error);
    }
  };

  useEffect(() => {

    fetchAlbum();

  }, [track.track_id]);

  return (
    <div className={style['next-track']}>
        <img className={style['next-track-image']} src={`${API_URL}/${album?.album_image}`} alt={track.track_name} />
        <div className={style['next-track-info']}>
            <span className={style['next-track-name']}>{track.track_name}</span>
            <span className={style['next-track-artist']}>{artistName}</span>
        </div>
    </div>
  );
};

export default NextQueue;
