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

func (controller *UserController) Create(ctx *gin.Context) {
	fmt.Println("Creating New User...")

	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.CheckPanic(err)

	controller.userService.Create(createUserRequest)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Max-Age", "86400")
	ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	ctx.Header("Access-Control-Allow-Credentials", "true")
	ctx.Header("Content-type", "application/json")
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) FindUser(ctx *gin.Context, id string) {
	fmt.Println("Find user...")
	// userResponse := controller.userService.FindUser(id)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		// Data:   userResponse,
		Data:   nil,
	}

	ctx.Header("Content-type", "application/json")
	ctx.JSON(http.StatusOK, WebResponse)
}
