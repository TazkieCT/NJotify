package response

type TrackById struct {
	Id          string `json:"track_id"`
	Name        string `json:"track_name"`
	AlbumName   string `json:"track_album"`
	AlbumImage  string `json:"track_image"`
	Duration    int    `json:"track_duration"`
	ListenCount int    `json:"track_count"`
	AlbumId     string `json:"track_album_id"`
	File        string `json:"track_file"`
}
