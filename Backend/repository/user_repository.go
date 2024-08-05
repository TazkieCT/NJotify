package repository

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/model"
	"github.com/google/uuid"
)

type UserRepository interface {
	SignIn(user model.User)
	Activate(email string)
	ChangePass(email string, password string)
	GetUser(email string) model.User
	GetProfile(id string) model.User
	EditUser(user model.User, edit request.EditUserRequest)
	GetVerified(user model.Artist)
	GetVerifyUser() []model.User
	AcceptVerify(id string)
	RemoveArtist(id string)
	EditProfile(id string, image string)
	Logout()
	GetUserByArtist(idUser string) model.User
	UpdateUserSetting(userId uuid.UUID, music int, podcast int, follow int) error
	GetUserSetting(userId string) model.UserSetting
}
