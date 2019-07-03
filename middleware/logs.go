package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type LogEntry struct {
	Additional []interface{} `json:"additional"`
	FileName   string        `json:"fileName"`
	Level      int           `json:"level"`
	LineNumber string        `json:"lineNumber"`
	Message    string        `json:"message"`
	Timestamp  string        `json:"timestamp"`
}

var Logs = func(c *gin.Context) {

	entry := LogEntry{}
	err := c.BindJSON(&entry)
	if err == nil {
		fmt.Println(entry)
	}

	c.AbortWithStatus(http.StatusOK)
}
