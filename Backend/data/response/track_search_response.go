package response

type TrackSearchResponse struct {
	Id     string `json:"track_id"`
	Name   string `json:"track_name"`
	Image  string `json:"track_image"`
	Artist string `json:"track_artist"`
}
