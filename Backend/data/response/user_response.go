package response

import (
	"github.com/google/uuid"
)

type UserResponse struct {
	Id       uuid.UUID `json='id'`
	Username string    `json:"username,omitEmpty"`
	Email    string    `json='email'`
	Gender   string    `json:"gender,omitEmpty"`
	Dob      string    `json:"dob,omitEmpty"`
	Role     string    `json:"role"`
}
