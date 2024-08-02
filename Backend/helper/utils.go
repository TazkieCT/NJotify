package helper

import (
	"fmt"
	"net/smtp"
	"strings"
	"time"

	"github.com/TazkieCT/njotify/constant"
	"github.com/dgrijalva/jwt-go"
)

func GenerateJWT(email string) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * time.Duration(constant.JWT_EXPIRATION_HOURS)).Unix(),
	})

	tokenString, err := token.SignedString([]byte(constant.JWT_SECRET_KEY))
	CheckPanic(err)

	return tokenString
}

func ValidateJWT(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(constant.JWT_SECRET_KEY), nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		email, ok := claims["email"].(string)
		if !ok {
			return "", fmt.Errorf("email claim not found")
		}
		return email, nil
	}

	return "", fmt.Errorf("invalid token")
}

func SendMail(to []string, cc []string, subject, message string) error {
	body := "From: " + constant.CONFIG_SENDER_NAME + "\n" +
		"To: " + strings.Join(to, ",") + "\n" +
		"Cc: " + strings.Join(cc, ",") + "\n" +
		"Subject: " + subject + "\n\n" +
		message

	auth := smtp.PlainAuth("", constant.CONFIG_AUTH_EMAIL, constant.CONFIG_AUTH_PASSWORD, constant.CONFIG_SMTP_HOST)
	smtpAddr := fmt.Sprintf("%s:%d", constant.CONFIG_SMTP_HOST, constant.CONFIG_SMTP_PORT)

	err := smtp.SendMail(smtpAddr, auth, constant.CONFIG_AUTH_EMAIL, append(to, cc...), []byte(body))
	if err != nil {
		return err
	}

	return nil
}

func DamerauLevenshtein(s1, s2 string) int {
	lenS1 := len(s1)
	lenS2 := len(s2)

	dist := make([][]int, lenS1+1)
	for i := range dist {
		dist[i] = make([]int, lenS2+1)
	}

	for i := 0; i <= lenS1; i++ {
		dist[i][0] = i
	}
	for j := 0; j <= lenS2; j++ {
		dist[0][j] = j
	}

	for i := 1; i <= lenS1; i++ {
		for j := 1; j <= lenS2; j++ {
			cost := 0
			if s1[i-1] != s2[j-1] {
				cost = 1
			}

			dist[i][j] = Min(
				dist[i-1][j]+1,
				Min(
					dist[i][j-1]+1,
					dist[i-1][j-1]+cost,
				),
			)

			if i > 1 && j > 1 && s1[i-1] == s2[j-2] && s1[i-2] == s2[j-1] {
				dist[i][j] = Min(dist[i][j], dist[i-2][j-2]+cost)
			}
		}
	}

	return dist[lenS1][lenS2]
}

func Min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
