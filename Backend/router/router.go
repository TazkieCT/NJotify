package router

import (
	"time"

	"github.com/TazkieCT/njotify/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(userController *controller.UserController, albumController *controller.AlbumController, trackController *controller.TrackController, playlistController *controller.PlaylistController, artistController *controller.ArtistController) *gin.Engine {
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
	router.GET("/activate/:token", userController.ActivateUser)
	router.POST("/login", userController.GetUser)
	router.POST("/edit", userController.UpdateUser)
	router.POST("/edit-profile", userController.EditProfile)
	router.POST("/verify", userController.GetVerified)
	router.GET("/admin", userController.GetAllVerifiedUser)
	router.GET("/set-artist/:userId", userController.SetArtist)
	router.GET("/remove-artist/:userId", userController.RemoveArtist)
	router.GET("/forgot/:email", userController.Forgot)
	router.POST("/reset", userController.Reset)

	// UNTUK ALBUM
	router.POST("/create-music", albumController.CreateAlbum)
	router.GET("/get-all-album", albumController.GetAllAlbum)
	router.GET("/get-album/:albumId", albumController.GetAllAlbumById)
	router.GET("/get-album-artist/:artistId", albumController.GetAllAlbumByArtist)
	router.GET("/get-album-track/:trackId", albumController.GetAlbumByTrack)

	// UNTUK TRACK
	router.GET("/get-track-album/:albumId", trackController.GetAllTrackByAlbum)
	router.GET("/get-track-playlist/:playlistId", trackController.GetAllTrackByPlaylist)
	router.GET("/get-track-artist/:artistId", trackController.GetAllTrackByArtist)
	router.GET("/get-track-id/:trackId", trackController.GetAllTrackById)

	// UNTUK PLAYLIST
	router.POST("/create-playlist", playlistController.CreatePlaylist)
	router.GET("/get-playlist-user/:userId", playlistController.GetAllPlaylistByUser)
	router.GET("/get-playlist-id/:playlistId", playlistController.GetPlaylistById)
	router.GET("/get-playlist-artist/:artistId", playlistController.GetPlaylistsByArtist)
	router.POST("/add-track-playlist", playlistController.AddTrackPlaylist)
	router.POST("/remove-track-playlist", playlistController.DeleteTrackPlaylist)
	router.GET("/delete/:playlistId", playlistController.DeletePlaylist)

	// UNTUK ARTIST
	router.GET("/artist/:artistId", artistController.GetArtistById)
	router.GET("/artist-track/:trackId", artistController.GetArtistByTrack)

	return router
}
