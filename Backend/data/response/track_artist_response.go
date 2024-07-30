package response

type TrackArtist struct {
	Id         string `json:"track_id"`
	Name       string `json:"track_name"`
	AlbumImage string `json:"track_image"`
	File       string `json:"track_file"`
}
