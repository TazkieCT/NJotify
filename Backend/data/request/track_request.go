package request

type TrackRequest struct {
	Id      string `validate:"required" json:"track_id"`
	Name    string `validate:"required" json:"track_name"`
	File    string `validate:"required" json:"track_file"`
	AlbumId string `validate:"required" json:"track_album_id"`
}
