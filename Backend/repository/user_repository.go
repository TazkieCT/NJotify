package repository

import "github.com/TazkieCT/njotify/model"

type UserRepository interface {
	Save(user model.User)
	FindUser(user model.User, id string) model.User
}
