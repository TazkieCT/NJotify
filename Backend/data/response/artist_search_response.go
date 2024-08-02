package response

type UserSearchResponse struct {
	Id           string `json:"user_id"`
	Name         string `json:"user_name"`
	ProfileImage string `json:"profile_image"`
	Role         string `json:"user_role"`
}
