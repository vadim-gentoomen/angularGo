package middleware

import (
	"angularGo/models"
	"angularGo/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

var CreateAccount = func(c *gin.Context) {
	var account models.Account
	err := c.BindJSON(&account)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.Message(false, "Bad request"))
		return
	}

	resp := account.Create()
	if value, ok := resp["status"]; value.(bool) && ok {
		c.JSON(http.StatusOK, resp)
	} else {
		c.JSON(http.StatusBadRequest, resp)
	}
}

var Authenticate = func(c *gin.Context) {
	var account models.Account
	err := c.BindJSON(&account)
	if err != nil {
		c.JSON(http.StatusBadRequest, utils.Message(false, "Bad request"))
		return
	}

	resp := models.Login(account.Email, account.Password)
	if value, ok := resp["status"]; value.(bool) && ok {
		c.JSON(http.StatusOK, resp)
	} else {
		c.JSON(http.StatusForbidden, resp)
	}

}
