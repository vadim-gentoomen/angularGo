package main

import (
	"angularGo/middleware"
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

	gin.SetMode(gin.DebugMode)
	r := gin.New()

	r.Use(gin.Logger(), gin.Recovery())
	r.Use(middleware.FixCORS())

	r.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))

	public := r.Group("/api/v1")
	public.POST("/user/new", middleware.CreateAccount)
	public.POST("/user/login", middleware.Authenticate)

	private := r.Group("/api/v1")
	private.Use(middleware.Auth())
	private.GET("/all", middleware.GetAll) //test

	r.POST("/api/logs", middleware.Logs)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r.Run(":" + port)
}
