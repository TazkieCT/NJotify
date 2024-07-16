package response

import (
	"github.com/google/uuid"
)

type UserResponse struct {
	Id       uuid.UUID `json='id'`
	Username string    `json:"username"`
	Email    string    `json='email'`
	Password string    `json='password'`
	Gender   string    `json:"gender"`
	Dob      string    `json:"dob"`
	Role     string    `json:"role"`
}
