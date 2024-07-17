package repository

import "github.com/TazkieCT/njotify/model"

type UserRepository interface {
	SignIn(user model.User)
	Activate(user model.User)
	GetUser(email string) model.User
}
