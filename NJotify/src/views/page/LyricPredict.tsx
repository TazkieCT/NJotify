import React, { useState } from 'react';
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
    <div>
      <h1>Predict Artist</h1>
      <textarea
        rows={6}
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder="Enter song lyrics here"
      />
      <br />
      <button onClick={handlePredict}>Predict Artist</button>
      {predictedArtist && (
        <div>
          <h2>Predicted Artist:</h2>
          <p>{predictedArtist}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ArtistPredictor;
