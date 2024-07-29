package request

type AddTrackToPlaylist struct {
	Playlist string `validate:"required" json:"playlist_id"`
	Track    string `validate:"required" json:"track_id"`
}
