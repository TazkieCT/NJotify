package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type UserService interface {
	Create(user request.CreateUserRequest)
	FindUser() response.UserResponse
}
