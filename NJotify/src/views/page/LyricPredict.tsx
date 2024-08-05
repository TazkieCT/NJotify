import React, { useState } from 'react';
import style from "../../styles/page/PredictPage.module.css";
import axios from 'axios';

const ArtistPredictor: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>('');
  const [predictedArtist, setPredictedArtist] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        lyrics,
      });

      setPredictedArtist(response.data.predicted_artist);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
      setPredictedArtist(null);
    }
  };

  return (
    <div className={style.container}>
        <div className={style.content}>
            <h1 className={style.heading}>Predict Artist</h1>
            <textarea
              className={style.textarea}
              rows={6}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter song lyrics here"
            />
            <br />
            <button className={style.button} onClick={handlePredict}>Predict Artist</button>
            {predictedArtist && (
              <div>
                <h2 className={style.heading}>Predicted Artist:</h2>
                <p className={style.text}>{predictedArtist}</p>
              </div>
            )}
            {error && (
              <div>
                <h2 className={style.heading}>Error:</h2>
                <p className={style.text}>{error}</p>
              </div>
            )}
        </div>
    </div>
  );
};

export default ArtistPredictor;
