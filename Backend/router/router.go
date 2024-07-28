package router

import (
	"time"

	"github.com/TazkieCT/njotify/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(userController *controller.UserController, albumController *controller.AlbumController, trackController *controller.TrackController) *gin.Engine {
	router := gin.Default()

	corsMiddleware := cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
	})

	router.Use(corsMiddleware)
	router.Static("/public/image/", "./public/image/")
	router.Static("/public/tracks/", "./public/tracks/")

	// UNTUK USER
	router.POST("/signup", userController.CreateUser)
	router.POST("/activate", userController.ActivateUser)
	router.POST("/login", userController.GetUser)
	router.POST("/edit", userController.UpdateUser)
	router.POST("/verify", userController.GetVerified)
	router.GET("/admin", userController.GetAllVerifiedUser)
	router.GET("/set-artist/:userId", userController.SetArtist)
	router.GET("/remove-artist/:userId", userController.RemoveArtist)

	// UNTUK ALBUM
	router.POST("/create-music", albumController.CreateAlbum)
	router.GET("/get-all-album", albumController.GetAllAlbum)
	router.GET("/get-album/:albumId", albumController.GetAllAlbumById)
	
	// UNTUK TRACK
	router.GET("/get-track-album/:albumId", trackController.GetAllTrackByAlbum)

	return router
}
