package request

type CreateAlbumRequest struct {
	Artist string `validate:"required" json:"album_user"`
	Name   string `validate:"required" json:"album_name"`
	Type   string `validate:"required" json:"album_type"`
	Image  []byte `validate:"required" json:"album_image"`
}
