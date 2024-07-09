package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
)

type UserServiceImpl struct {
	UserRepository repository.UserRepository
	Validate       *validator.Validate
}

func NewUserServiceImpl(userRepository repository.UserRepository, validate *validator.Validate) UserService {
	return &UserServiceImpl{
		UserRepository: userRepository,
		Validate:       validate,
	}
}

func (c *UserServiceImpl) Create(user request.CreateUserRequest) {

}

func (r *UserServiceImpl) FindUser(id string) response.UserResponse {
	result := r.UserRepository.FindUser(id)

	user := response.UserResponse{
		Id:       result.Id,
		Email:    result.Email,
		Password: result.Password,
		Role:     result.Roles,
	}

	return user
}
