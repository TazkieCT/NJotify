package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type UserService interface {
	CreateUser(user request.CreateUserRequest) string
	ActivateUser(email string)
	ChangePass(email string, password string)
	GetUser(email string, password string) (response.UserResponse, string)
	EditUser(user request.EditUserRequest)
	EditProfile(user request.EditProfileRequest)
	GetVerifiedUser(user request.GetVerifiedUser)
	GetAllVerifiedUser() []response.UserVerifiedResponse
	SetArtist(id string)
	RemoveArtist(id string)
	Forgot(email string) string
	ResetPassword(email string, pass string)
}
