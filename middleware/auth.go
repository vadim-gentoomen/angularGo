package middleware

import (
	jwtlib "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gin-gonic/gin"
	"os"
)

var tokenPassword = os.Getenv("token_password")

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, err := request.ParseFromRequest(c.Request, request.OAuth2Extractor, func(token *jwtlib.Token) (interface{}, error) {
			b := []byte(tokenPassword)
			return b, nil
		})

		if err != nil {
			c.AbortWithError(401, err)
		}
	}
}
