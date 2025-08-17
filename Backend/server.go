package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/TazkieCT/njotify/cache"
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
	redis := cache.ConnectRedis()

	errs := db.AutoMigrate(
		&model.User{},
		&model.Artist{},
		&model.Album{},
		&model.Track{},
		&model.Playlist{},
		&model.PlaylistTrack{},
		&model.UserSetting{},
		&model.UserFollow{},
	)
	if errs != nil {
		log.Fatal("AutoMigrate failed:", errs)
	}
	fmt.Println("Migration complete")

	validator := validator.New()

	userRepository := repository.NewUserRepositoryImpl(db, redis)
	albumRepository := repository.NewAlbumRepositoryImpl(db, redis)
	trackRepository := repository.NewTrackRepositoryImpl(db, redis)
	playlistRepository := repository.NewPlaylistRepositoryImpl(db, redis)
	artistRepository := repository.NewArtistRepositoryImpl(db, redis)
	searchRepository := repository.NewSearchRepositoryImpl(db, redis)

	userService := services.NewUserServiceImpl(userRepository, validator)
	albumService := services.NewAlbumServiceImpl(albumRepository, validator)
	trackService := services.NewTrackServiceImpl(trackRepository, validator)
	playlistService := services.NewPlaylistServiceImpl(playlistRepository, validator)
	artistService := services.NewArtistServiceImpl(artistRepository, validator)
	searchService := services.NewSearchServiceImpl(searchRepository, validator, artistRepository, albumRepository, trackRepository, playlistRepository)

	userController := controller.NewUserController(userService)
	albumController := controller.NewAlbumController(albumService)
	trackController := controller.NewTrackController(trackService)
	playlistController := controller.NewPlaylistController(playlistService)
	artistController := controller.NewArtistController(artistService)
	searchController := controller.NewSearchController(searchService)

	routers := router.NewRouter(userController, albumController, trackController, playlistController, artistController, searchController)
	server := &http.Server{
		Addr:    ":8080",
		Handler: routers,
	}

	err := server.ListenAndServe()
	helper.CheckPanic(err)
}
