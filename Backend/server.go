package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	r := gin.Default()
	id := uuid.New()

	fmt.Println(id)
	// r.GET("/ping", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message_id": id,
	// 		"version":    "1.0.0",
	// 	})
	// })

	r.Run()
}
