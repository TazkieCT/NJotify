package services

import (
	"github.com/TazkieCT/njotify/data/request"
)

type UserService interface {
	Create(user request.CreateUserRequest)
	// FindUser(id string) response.UserResponse
}
