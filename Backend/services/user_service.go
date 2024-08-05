package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type UserService interface {
	CreateUser(user request.CreateUserRequest) string
	ActivateUser(email string)
	ChangePass(email string, newPassword string) error
	GetUser(email string, password string) (response.UserResponse, string)
	FetchUser(email string) response.UserResponse
	EditUser(user request.EditUserRequest)
	EditProfile(user request.EditProfileRequest)
	GetVerifiedUser(user request.GetVerifiedUser)
	GetAllVerifiedUser() []response.UserVerifiedResponse
	SetArtist(id string)
	RemoveArtist(id string)
	Forgot(email string) string
	ResetPassword(email string, newPassword string) error
	Logout()
	GetUserByArtist(idUser string) response.UserResponse
	UpdateUserSetting(userId string, music int, podcast int, follow int)
	GetUserSetting(idUser string) response.EditSettingResponse
}
