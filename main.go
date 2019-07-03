package main

import (
	"angularGo/middleware"
	"github.com/gin-gonic/gin"
	"os"
)

func main() {

	gin.SetMode(gin.DebugMode)
	r := gin.New()

	r.Use(gin.Logger(), gin.Recovery())
	r.Use(middleware.FixCORS())

	r.NoRoute(middleware.Static())

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
