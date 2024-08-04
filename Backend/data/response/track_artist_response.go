package response

type TrackArtist struct {
	Id          string `json:"track_id"`
	Name        string `json:"track_name"`
	AlbumImage  string `json:"track_image"`
	Duration    int    `json:"track_duration"`
	ListenCount int    `json:"track_count"`
	File        string `json:"track_file"`
}
