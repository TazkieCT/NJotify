package response

type EditSettingResponse struct {
	MusicArtist int `json:"music_artist"`
	Podcast     int `json:"podcast"`
	Follow      int `json:"follow"`
}
