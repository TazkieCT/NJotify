package response

type PlaylistSearchResponse struct {
	Id    string `json:"playlist_id"`
	Name  string `json:"playlist_name"`
	Image string `json:"playlist_image"`
}
