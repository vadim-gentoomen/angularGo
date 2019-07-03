package middleware

import (
	"fmt"
	jwtlib "github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path"
	"path/filepath"
)

type LogEntry struct {
	Additional []interface{} `json:"additional"`
	FileName   string        `json:"fileName"`
	Level      int           `json:"level"`
	LineNumber string        `json:"lineNumber"`
	Message    string        `json:"message"`
	Timestamp  string        `json:"timestamp"`
}

var tokenPassword = os.Getenv("token_password")

func Static() gin.HandlerFunc {
	return func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./ui/dist/index.html")
		} else {
			c.File("./ui/dist/" + path.Join(dir, file))
		}
	}
}

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

func FixCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, POST, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

var Logs = func(c *gin.Context) {

	entry := LogEntry{}
	err := c.BindJSON(&entry)
	if err == nil {
		fmt.Println(entry)
	}

	c.AbortWithStatus(http.StatusOK)
}
