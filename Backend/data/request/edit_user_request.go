package request

type EditUserRequest struct {
	Email   string `validate:"required" json:"email"`
	Gender  string `validate:"required" json:"gender"`
	Dob     string `validate:"required" json:"dob"`
	Country string `validate:"required" json:"country"`
}
