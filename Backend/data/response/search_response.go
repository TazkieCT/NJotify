package response

type SearchResponse struct {
	Type     string                   `json:"type"`
	Track    []TrackSearchResponse    `json:"track,omitempty"`
	User     []UserSearchResponse     `json:"user,omitempty"`
	Album    []AlbumSearchResponse    `json:"album,omitempty"`
	Playlist []PlaylistSearchResponse `json:"playlist,omitempty"`
}
