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
	db := database.ConnectionDatabase()
	db.AutoMigrate(&model.User{}, &model.Artist{}, &model.Album{}, &model.Track{}, &model.Playlist{}, &model.PlaylistTrack{})

	validator := validator.New()

	userRepository := repository.NewUserRepositoryImpl(db)
	albumRepository := repository.NewAlbumRepositoryImpl(db)
	trackRepository := repository.NewTrackRepositoryImpl(db)

	userService := services.NewUserServiceImpl(userRepository, validator)
	albumService := services.NewAlbumServiceImpl(albumRepository, validator)
	trackService := services.NewTrackServiceImpl(trackRepository, validator)

	userController := controller.NewUserController(userService)
	albumController := controller.NewAlbumController(albumService)
	trackController := controller.NewTrackController(trackService)

	routers := router.NewRouter(userController, albumController, trackController)
	server := &http.Server{
		Addr:    ":8888",
		Handler: routers,
	}

	err := server.ListenAndServe()
	helper.CheckPanic(err)
}
