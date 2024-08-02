package repository

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/model"
)

type UserRepository interface {
	SignIn(user model.User)
	Activate(email string)
	ChangePass(email string, password string)
	GetUser(email string) model.User
	EditUser(user model.User, edit request.EditUserRequest)
	GetVerified(user model.Artist)
	GetVerifyUser() []model.User
	AcceptVerify(id string)
	RemoveArtist(id string)
	EditProfile(id string, image string)
	Logout()
}
