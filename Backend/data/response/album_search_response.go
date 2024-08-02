package response

type AlbumSearchResponse struct {
	Id     string `json:"album_id"`
	Name   string `json:"album_name"`
	Image  string `json:"album_image"`
	Type   string `json:"album_type"`
	Artist string `json:"album_artist"`
	Date   string `json:"album_date"`
}
