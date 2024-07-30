package response

type ArtistResponse struct {
	Name        string `json:"artist_name"`
	BannerImage string `json:"banner_image"`
	About       string `json:"about"`
}
