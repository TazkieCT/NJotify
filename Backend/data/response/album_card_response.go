package response

type AlbumCard struct {
	Id        string `json:"album_id"`
	Artist    string `json:"album_artist"`
	Name      string `json:"album_name"`
	Type      string `json:"album_type"`
	Image     string `json:"album_image"`
	CreatedAt string `json:"album_time"`
}
