package router

import (
	"time"

	"github.com/TazkieCT/njotify/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(userController *controller.UserController, albumController *controller.AlbumController, trackController *controller.TrackController, playlistController *controller.PlaylistController, artistController *controller.ArtistController, searchController *controller.SearchController) *gin.Engine {
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
	// router.Use(middleware.LoggingMiddleware())

	// router.Use(func(c *gin.Context) {
	// 	if c.FullPath() != "/login" {
	// 		middleware.AuthMiddleware()(c)
	// 	}
	// 	c.Next()
	// })

	router.Static("/public/image/", "./public/image/")
	router.Static("/public/tracks/", "./public/tracks/")

	// UNTUK USER
	router.POST("/signup", userController.CreateUser)
	router.GET("/activate/:token", userController.ActivateUser)
	router.POST("/login", userController.GetUser)
	router.POST("/fetch-user", userController.FetchUser)
	router.POST("/edit", userController.UpdateUser)
	router.POST("/edit-profile", userController.EditProfile)
	router.POST("/verify", userController.GetVerified)
	router.GET("/admin", userController.GetAllVerifiedUser)
	router.GET("/set-artist/:userId", userController.SetArtist)
	router.GET("/remove-artist/:userId", userController.RemoveArtist)
	router.GET("/forgot/:email", userController.Forgot)
	router.POST("/reset", userController.Reset)
	router.POST("/logout", userController.Logout)
	router.POST("/get-user/:userId", userController.Logout)

	// UNTUK ALBUM
	router.POST("/create-music", albumController.CreateAlbum)
	router.GET("/get-all-album", albumController.GetAllAlbum)
	router.GET("/get-album/:albumId", albumController.GetAllAlbumById)
	router.GET("/get-album-artist/:artistId", albumController.GetAllAlbumByArtist)
	router.GET("/get-album-track/:trackId", albumController.GetAlbumByTrack)
	router.GET("/get-album-other/:albumId", albumController.GetAnotherAlbum)

	// UNTUK TRACK
	router.GET("/get-track-album/:albumId", trackController.GetAllTrackByAlbum)
	router.GET("/get-track-playlist/:playlistId", trackController.GetAllTrackByPlaylist)
	router.GET("/get-track-artist/:artistId", trackController.GetAllTrackByArtist)
	router.GET("/get-track-id/:trackId", trackController.GetAllTrackById)
	router.GET("/add-queue/:trackId", trackController.AddTrackToQueue)
	router.GET("/remove-queue/:trackId", trackController.RemoveTrackFromQueue)
	router.GET("/reset-queue", trackController.ResetQueue)
	router.GET("/get-queue", trackController.GetQueue)

	// UNTUK PLAYLIST
	router.POST("/create-playlist", playlistController.CreatePlaylist)
	router.GET("/get-playlist-user/:userId", playlistController.GetAllPlaylistByUser)
	router.GET("/get-playlist-id/:playlistId", playlistController.GetPlaylistById)
	router.GET("/get-playlist-artist/:artistId", playlistController.GetPlaylistsByArtist)
	router.POST("/add-track-playlist", playlistController.AddTrackPlaylist)
	router.POST("/remove-track-playlist", playlistController.DeleteTrackPlaylist)
	router.GET("/delete-playlist/:playlistId", playlistController.DeletePlaylist)

	// UNTUK ARTIST
	router.GET("/artist/:artistId", artistController.GetArtistById)
	router.GET("/artist-track/:trackId", artistController.GetArtistByTrack)

	// UNTUK SEARCH
	router.GET("/search/:search", searchController.Searching)

	return router
}
