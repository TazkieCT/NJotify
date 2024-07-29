package response

type PlaylistUser struct {
	Id    string `json:"playlist_id"`
	User  string `json:"playlist_user"`
	Name  string `json:"playlist_name"`
	Image string `json:"playlist_image"`
	Desc  string `json:"playlist_desc"`
}
