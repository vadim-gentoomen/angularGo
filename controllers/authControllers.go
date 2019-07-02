package controllers

import (
	"angularGo/models"
	"github.com/gin-gonic/gin"
)

var CreateAccount = func(c *gin.Context) {
	var account models.Account
	err := c.BindJSON(&account)
	if err != nil {
		c.JSON(500, gin.H{"message": "Invalid request"})
		return
	}

	resp := account.Create()
	if value, ok := resp["status"]; value.(bool) && ok {
		c.JSON(200, gin.H{"message": resp})
	} else {
		c.JSON(500, gin.H{"message": resp})
	}
}

var Authenticate = func(c *gin.Context) {
	var account models.Account
	err := c.BindJSON(&account)
	if err != nil {
		c.JSON(500, gin.H{"message": "Invalid request"})
		return
	}

	resp := models.Login(account.Email, account.Password)
	if value, ok := resp["status"]; value.(bool) && ok {
		c.JSON(200, gin.H{"message": resp})
	} else {
		c.JSON(403, gin.H{"message": resp})
	}

}
