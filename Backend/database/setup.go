package database

import (
	"fmt"
	"os"

	"github.com/TazkieCT/njotify/helper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectionDatabase() *gorm.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	sqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	database, err := gorm.Open(postgres.Open(sqlInfo), &gorm.Config{})
	helper.CheckPanic(err)

	return database
}
