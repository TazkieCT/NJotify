package repository

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/model"
)

type UserRepository interface {
	SignIn(user model.User)
	Activate(user model.User)
	GetUser(email string) model.User
	EditUser(user model.User, edit request.EditUserRequest)
	GetVerified(user model.Artist)
	GetVerifyUser() []model.User
	SetArtist(id string)
	RemoveArtist(id string)
}
