package repository

import (
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type SearchRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewSearchRepositoryImpl(db *gorm.DB, redis *redis.Client) SearchRepository {
	return &SearchRepositoryImpl{Db: db, Redis: redis}
}
