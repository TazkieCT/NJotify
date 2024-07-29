package request

type CreatePlaylistRequest struct {
	UserId string `validate:"required" json:"user_id"`
	Name   string `validate:"required" json:"playlist_name"`
	Desc   string `validate:"required" json:"playlist_desc"`
}
