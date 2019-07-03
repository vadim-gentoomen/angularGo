package middleware

import (
	"angularGo/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

var GetAll = func(c *gin.Context) {
	c.JSON(http.StatusOK, utils.Message(true, "OK"))
}
