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

	// same as
	// config := cors.DefaultConfig()
	// config.AllowAllOrigins = true
	// router.Use(cors.New(config))

	// slozni := router.Group("select")
	// {
	// 	slozni.GET("1", h.postavshik)
	// 	slozni.GET("2", h.clients)
	// 	slozni.GET("3", h.usluga)
	// 	slozni.GET("4", h.fourth)
	// 	slozni.GET("5", h.fifth)
	// 	slozni.GET("6", h.sixth)
	// 	slozni.GET("7/:title", h.seventh)

	// }

	// zapros := router.Group("table")
	// {

	// 	request_card := zapros.Group("/card")
	// 	{
	// request_card.GET("/all", h.cardZapros)
	// request_card.GET("/:id", h.cardZaprosById)
	// request_card.POST("/new", h.cardCreate)
	// request_card.DELETE("/delete/:id", h.cardDeleteById)
	// }

	// 	request_work := zapros.Group("/work")
	// 	{
	// 		request_work.GET("/all", h.workZapros)
	// 		request_work.GET("/:id", h.workZaprosById)
	// 		request_work.POST("/new", h.workCreate)
	// 		request_work.DELETE("/delete/:id", h.workDeleteById)

	// 	}

	// 	request_service := zapros.Group("/service")
	// 	{
	// 		request_service.GET("/all", h.serviceZapros)
	// 		request_service.GET("/:id", h.serviceZaprosById)
	// 		request_service.POST("/new", h.serviceCreate)
	// 		request_service.DELETE("/delete/:id", h.serviceDeleteById)

	// 	}

	// 	request_materials := zapros.Group("/materials")
	// 	{
	// 		request_materials.GET("/all", h.materialZapros)
	// 		request_materials.GET("/:id", h.materialZaprosById)
	// 		request_materials.POST("/new", h.materialCreate)
	// 		request_materials.DELETE("/delete/:id", h.materialDeleteById)
	// 	}

	// 	request_customer := zapros.Group("/customer")
	// 	{
	// 		request_customer.GET("/all", h.customerZapros)
	// 		request_customer.GET("/:id", h.customerZaprosById)
	// 		request_customer.POST("/new", h.customerCreate)
	// 		request_customer.DELETE("/delete/:id", h.customerDeleteById)
	// 	}

	// 	request_deliver := zapros.Group("/deliver")
	// 	{
	// 		request_deliver.GET("/all", h.deliverZapros)
	// 		request_deliver.GET("/:id", h.deliverZaprosById)
	// 		request_deliver.POST("/new", h.deliverCreate)
	// 		request_deliver.DELETE("/delete/:id", h.deliverDeleteById)
	// 	}

	// 	request_category := zapros.Group("/category")
	// 	{
	// 		request_category.GET("/all", h.categoryZapros)
	// 		request_category.GET("/:id", h.categoryZaprosById)
	// 		request_category.POST("/new", h.categoryCreate)
	// 		request_category.DELETE("/delete/:id", h.categoryDeleteById)
	// 	}

	// }

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.signUp)
		auth.POST("/sign-in", h.signIn)
	}

	api := router.Group("/api", h.userIdentity)
	{
		dashboard := api.Group("/dashboard")
		{
			lists := dashboard.Group("/lists")
			{
				lists.POST("/", h.createList)
				lists.POST("/room/", h.createRoom)
				lists.GET("/", h.getAllList)
				lists.GET("/:id", h.getListById)
				lists.PUT("/:id", h.updateDesk)
				lists.DELETE("/delete/:id", h.deleteDesk)
			}
			tasks := dashboard.Group("/tasks")
			{
				tasks.POST("/", h.createTask)
				tasks.GET("/all/:id", h.getAllTask)
				tasks.GET("byid/:id", h.getTaskById)

				tasks.GET("/all/:id/todo", h.getTasksToDo)
				tasks.GET("/all/:id/inwork", h.getTasksInWork)
				tasks.GET("/all/:id/done", h.getTasksDone)

				tasks.POST("/:id", h.updateTask)
				tasks.DELETE("/delete/:id", h.deleteTask)
			}
			comment := dashboard.Group("/comment")
			{
				comment.POST("/", h.createComment)
				// lists.GET("/", h.getAllList)
				// lists.GET("/:id", h.getListById)
				// comment.PUT("/:id", h.updateComment)
				comment.DELETE("/delete/:id", h.deleteComment)
			}
			profile := dashboard.Group("/profile")
			{
				profile.GET("/", h.GetProfile)
			}
			room := dashboard.Group("/room")
			{
				room.GET("/:id", h.getRoom)
				room.GET("/logins/:id", h.getLogins)
				room.POST("/newuser/:id", h.newUser)
				room.GET("/all", h.getAll)
				room.DELETE("/delete/:id", h.deleteUser)
			}
		}
	}

	//api := router.Group("/api", h.userIdentity)
	//{
	//
	//	lists := api.Group("/lists")
	//	{
	//		lists.POST("/", h.createList)
	//		lists.GET("/", h.getAllList)
	//		lists.GET("/:id", h.getListById)
	//		lists.PUT("/:id", h.updateList)
	//		lists.DELETE("/:id", h.deleteList)
	//
	//		items := lists.Group(":id/items")
	//		{
	//			items.POST("/", h.createItem)
	//			items.GET("/", h.getAllItem)
	//		}
	//	}
	//
	//	items := api.Group("items")
	//	{
	//		items.GET("/:id", h.getItemById)
	//		items.PUT("/:id", h.updateItem)
	//		items.DELETE("/:id", h.deleteItem)
	//	}
	//
	//}

	return router
}
