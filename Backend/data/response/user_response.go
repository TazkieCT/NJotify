package response

import "github.com/google/uuid"

type UserResponse struct {
	Id       uuid.UUID `json='id'`
	Email    string    `json='email'`
	Password string    `json='password'`
	Role     string    `json='role'`
}
