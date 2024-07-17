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
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Max-Age", "86400")
	ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	ctx.Header("Access-Control-Allow-Credentials", "true")
	ctx.Header("Content-type", "application/json")
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
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Max-Age", "86400")
	ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	ctx.Header("Access-Control-Allow-Credentials", "true")
	ctx.Header("Content-type", "application/json")
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetUser(ctx *gin.Context) {
	// fmt.Println("Find user...")
	email := ctx.Param("email")
	// fmt.Println(email)
	userResponse := controller.userService.GetUser(email)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Max-Age", "86400")
	ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")
	ctx.Header("Access-Control-Allow-Credentials", "true")
	ctx.Header("Content-type", "application/json")
	ctx.JSON(http.StatusOK, WebResponse)
}
