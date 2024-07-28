package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type UserService interface {
	CreateUser(user request.CreateUserRequest)
	ActivateUser(email string)
	GetUser(email string, password string) response.UserResponse
	EditUser(user request.EditUserRequest)
	GetVerifiedUser(user request.GetVerifiedUser)
	GetAllVerifiedUser() []response.UserVerifiedResponse
	SetArtist(id string)
	RemoveArtist(id string)
}
