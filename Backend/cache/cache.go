package cache

import (
	"fmt"
	"log"

	"github.com/go-redis/redis"
)

func ConnectRedis() *redis.Client {
	redisClient := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})

	_, err := redisClient.Ping().Result()
	if err != nil {
		log.Fatal("failed to connect to redis:", err)
	}
	fmt.Println("Connected to Redis")

	return redisClient
}
