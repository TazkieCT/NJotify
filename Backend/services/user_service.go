package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type UserService interface {
	CreateUser(user request.CreateUserRequest)
	ActivateUser(email string)
	GetUser(email string) response.UserResponse
}
