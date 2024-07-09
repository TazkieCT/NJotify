package router

import (
	"github.com/TazkieCT/njotify/controller"
	"github.com/gin-gonic/gin"
)

func NewRouter(userController *controller.UserController) *gin.Engine {
	router := gin.Default()

	router.POST("/log", userController.Create)
	// Masih Rusak :'
	// router.POST("/log", userController.FindUser)

	return router
}
