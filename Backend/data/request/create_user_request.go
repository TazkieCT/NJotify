package request

type CreateUserRequest struct {
	Username *string `json:"username"`
	Email    string  `validate:"required" json:"email"`
	Password string  `validate:"required" json:"password"`
	Gender   *string `json:"gender"`
	Dob      *string `json:"dob"`
	Role     *string `json:"role"`
}
