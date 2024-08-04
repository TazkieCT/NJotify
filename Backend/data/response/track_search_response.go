package response

type TrackSearchResponse struct {
	Id          string `json:"track_id"`
	Name        string `json:"track_name"`
	Duration    int    `json:"track_duration"`
	Image       string `json:"track_image"`
	Artist      string `json:"track_artist"`
	ListenCount int    `json:"track_count"`
}
