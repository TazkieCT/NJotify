package response

type TrackPlaylist struct {
	Id          string `json:"track_id"`
	Artist      string `json:"track_artist"`
	Name        string `json:"track_name"`
	Duration    int    `json:"track_duration"`
	ListenCount int    `json:"track_count"`
	AlbumName   string `json:"track_album_name"`
	AlbumImage  string `json:"track_album_image"`
	File        string `json:"track_file"`
	AddedAt     string `json:"added_at"`
}
