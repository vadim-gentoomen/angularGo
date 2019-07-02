package main

import (
	"angularGo/auth"
	"angularGo/controllers"
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
)

func main() {

	if e := godotenv.Load(); e != nil { //Загрузить файл .env
		fmt.Println(e)
	}

	tokenPassword := os.Getenv("token_password")

	gin.SetMode(gin.DebugMode)
	r := gin.New()

	r.Use(gin.Logger(), gin.Recovery())
	r.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))

	public := r.Group("/api/v1")
	public.POST("/user/new", controllers.CreateAccount)
	public.POST("/user/login", controllers.Authenticate)

	private := r.Group("/api/v1")
	private.Use(auth.Auth(tokenPassword))
	private.GET("/all", controllers.GetAll) //test

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r.Run(":" + port)

}
