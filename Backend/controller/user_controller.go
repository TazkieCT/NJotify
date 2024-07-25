package controller

import (
	"fmt"
	"net/http"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{
		userService: service,
	}
}

func (controller *UserController) CreateUser(ctx *gin.Context) {
	fmt.Println("Creating New User...")

	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.CheckPanic(err)

	controller.userService.CreateUser(createUserRequest)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) ActivateUser(ctx *gin.Context) {
	fmt.Println("Activate User...")

	activateUserRequest := request.ActivateUserRequest{}
	err := ctx.ShouldBindJSON(&activateUserRequest)
	helper.CheckPanic(err)

	controller.userService.ActivateUser(activateUserRequest.Email)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetUser(ctx *gin.Context) {
	// fmt.Println("Find user...")
	createUserRequest := request.CreateUserRequest{}
	if err := ctx.ShouldBindJSON(&createUserRequest); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userResponse := controller.userService.GetUser(createUserRequest.Email, createUserRequest.Password)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
