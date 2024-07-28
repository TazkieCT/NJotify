package response

type TrackAlbum struct {
	Id     string `json:"song_id"`
	Artist string `json:"song_artist"`
	Name   string `json:"song_name"`
	Album  string `json:"song_album"`
	File   string `json:"song_file"`
	Image  string `json:"song_image"`
}
