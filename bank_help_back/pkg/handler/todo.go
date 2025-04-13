package handler

import (
	"dashboard"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetById(c *gin.Context) {
	Todoid, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.Todo `json:"data"`
	}

	lists, err := h.services.Todo.GetById(Todoid)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetAllAuthorTodos(c *gin.Context) {
	// todo_id _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.Todo `json:"data"`
	}

	lists, err := h.services.Todo.GetAllAuthorTodos(author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetInWorkTodos(c *gin.Context) {
	// todo_id _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.Todo `json:"data"`
	}

	lists, err := h.services.Todo.GetInWorkTodos(author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetFinishedTodos(c *gin.Context) {
	// todo_id _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.Todo `json:"data"`
	}

	lists, err := h.services.Todo.GetFinishedTodos(author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) CreateTodo(c *gin.Context) {
	// todo_id _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	var input dashboard.Todo
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Todo `json:"data"`
	}

	id, err := h.services.Todo.CreateTodo(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}
