package response

type TrackById struct {
	Id         string `json:"track_id"`
	Name       string `json:"track_name"`
	AlbumName  string `json:"track_album"`
	AlbumImage string `json:"track_image"`
	File       string `json:"track_file"`
}
