package request

type TrackToPlaylist struct {
	Playlist string `validate:"required" json:"playlist_id"`
	Track    string `validate:"required" json:"track_id"`
}
