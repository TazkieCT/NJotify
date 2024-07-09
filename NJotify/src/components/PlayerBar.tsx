const PlayerBar = () => {
  return (
    <div>
      <div className="player-bar">
        <div className="player-bar-left">
          <img src="https://via.placeholder.com/30x30" alt="song cover" />
          <div className="song-info">
            <h3>Song Name</h3>
            <p>Artist Name</p>
          </div>
        </div>
        <div className="player-bar-right">
          <button className="prev-btn">
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="play-btn">
            <i className="fas fa-play"></i>
          </button>
          <button className="next-btn">
            <i className="fas fa-step-forward"></i>
          </button>
          <div className="volume-control">
            <input type="range" min="0" max="100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
