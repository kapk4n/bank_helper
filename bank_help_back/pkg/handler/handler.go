package handler

import (
	"dashboard/pkg/service"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.Default()

	router.Use(func() gin.HandlerFunc {
		return func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
			// c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

			if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(204)
				return
			}
			c.Next()
		}
	}())

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}

	api := router.Group("/api", h.userIdentity)
	{
		tasks := api.Group("/tasks")
		{
			tasks.GET("byid/:id", h.getTaskById)
			tasks.GET("byid/task/:id", h.GetAllTaskByTest)
			tasks.GET("/result/users/:id", h.GetUserTaskResultById)
			tasks.GET("/result/users/task/:id", h.GetUserTaskResultByTaskId)
			tasks.GET("/variants/:id", h.GetTaskVariants)
			tasks.GET("/mins/:id", h.GetMinTaskByTest)
			tasks.POST("/create", h.CreateTask)
			tasks.POST("/create/result", h.CreateTaskResults)
			tasks.DELETE("/delete/:id", h.deleteTask)
		}
		profile := api.Group("/profile")
		{
			profile.GET("/", h.GetProfile)
			profile.GET("/groups", h.GetGroups)
		}
		test := api.Group("/test")
		{
			test.GET("/byid/:id", h.GetTestById)
			test.GET("/all/author", h.GetAllAuthorTests)
			test.GET("/all", h.GetAllTests)
			test.GET("/all/users", h.GetAllUserTests)
			test.GET("/percent/:id", h.GetPercentTest)
			test.POST("/create", h.CreateTest)
			test.PUT("/close/:id", h.CloseTest)
			test.DELETE("/delete/:id", h.DeleteTest)
		}
		todo := api.Group("/todo")
		{
			todo.GET("/byid/:id", h.GetById)
			todo.GET("/all/author", h.GetAllAuthorTodos)
			todo.GET("/inwork/author", h.GetInWorkTodos)
			todo.GET("/finished/author", h.GetFinishedTodos)
			todo.POST("/create", h.CreateTodo)
		}
		library := api.Group("/library")
		{
			library.GET("/sections/one", h.GetSections)
			library.GET("/sections/:section_id/articles", h.GetArticlesBySection)
			library.GET("/articles/:article_id", h.GetArticleByID)
			library.POST("/sections", h.CreateSection)
			library.POST("/articles", h.CreateArticle)

			library.PUT("/articles/word/:id", h.CreateWordArticle)
			library.GET("/articles/word/:article_id", h.GetWordArticle)

			library.POST("/file/articles", h.CreateFileArticle)
			library.GET("/sections/:section_id/articles/:article_id/files", h.GetFileList)
			library.GET("/sections/:section_id/articles/:article_id/files/download/:filename", h.DownloadFile)
		}
		employee := api.Group("/employee")
		{
			employee.GET("/all", h.GetAllEmployees) // Все сотрудники
			employee.GET("/one/:id", h.GetEmployeeByID)
		}
	}

	return router
}
