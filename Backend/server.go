package main

import (
	"net/http"

	"github.com/TazkieCT/njotify/controller"
	"github.com/TazkieCT/njotify/database"
	"github.com/TazkieCT/njotify/helper"
	model "github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/TazkieCT/njotify/router"
	"github.com/TazkieCT/njotify/services"
	"github.com/go-playground/validator/v10"
)

func main() {
	// r := gin.Default()
	// id := uuid.New()

	// fmt.Println(id)
	// r.GET("/ping", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message_id": id,
	// 		"version":    "1.0.0",
	// 	})
	// })

	db := database.ConnectionDatabase()
	db.AutoMigrate(&model.User{})

	validator := validator.New()

	userRepository := repository.NewUserRepositoryImpl(db)
	userService := services.NewUserServiceImpl(userRepository, validator)
	userController := controller.NewUserController(userService)
	routes := router.NewRouter(userController)

	server := &http.Server{
		Addr:    ":8888",
		Handler: routes,
	}

	err := server.ListenAndServe()
	helper.CheckPanic(err)
}
