package request

type EditSettingRequest struct {
	UserId      string `validate:"required" json:"user_id"`
	MusicArtist int    `validate:"required" json:"music_artist"`
	Podcast     int    `validate:"required" json:"podcast"`
	Follow      int    `validate:"required" json:"follow"`
}
