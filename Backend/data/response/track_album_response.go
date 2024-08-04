package response

type TrackAlbum struct {
	Id          string `json:"track_id"`
	Artist      string `json:"track_artist"`
	Name        string `json:"track_name"`
	Album       string `json:"track_album"`
	File        string `json:"track_file"`
	Image       string `json:"track_image"`
	Duration    int    `json:"track_duration"`
	ListenCount int    `json:"track_count"`
}
