package response

type ArtistByTrackResponse struct {
	Id          string `json:"artist_id"`
	Name        string `json:"artist_name"`
	BannerImage string `json:"banner_image"`
	About       string `json:"about"`
}
