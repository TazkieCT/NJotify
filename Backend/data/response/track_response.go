package response

type TrackResponse struct {
	Id          string `json:"track_id"`
	Name        string `json:"track_name"`
	Duration    int    `json:"track_duration"`
	File        string `json:"track_file"`
	AlbumId     string `json:"track_album_id"`
	ListenCount int    `json:"track_count"`
}
