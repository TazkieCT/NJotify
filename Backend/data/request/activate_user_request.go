package request

type ActivateUserRequest struct {
	Email string `validate:"required" json:"email"`
}
