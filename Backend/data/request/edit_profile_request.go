package request

type EditProfileRequest struct {
	UserId string `validate:"required" json:"user_id"`
	Image []byte `validate:"required" form:"image"`
}
