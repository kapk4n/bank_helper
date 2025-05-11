package handler

import (
	"dashboard"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) createTask(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Task
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	fmt.Println("kpsafpak")

	id, err := h.services.Task.Create(input, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) updateTask(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	task_id, err := strconv.Atoi(c.Param("id"))
	var input dashboard.UpdateTaskInput
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.Task.Update(input, task_id, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	// c.JSON(http.StatusOK, map[string]interface{}{
	// 	"id": id,
	// })
}

func (h *Handler) deleteTask(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	taskId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "invalid list id param")
		return
	}

	err = h.services.Task.Delete(taskId, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{"ok"})
}

func (h *Handler) getAllTask(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskJoins `json:"data"`
	}

	lists, err := h.services.Task.GetAll(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) getTaskById(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.Task `json:"data"`
	}

	lists, err := h.services.Task.GetById(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) getTasksToDo(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskJoins `json:"data"`
	}

	lists, err := h.services.Task.GetTasksToDo(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) getTasksInWork(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskJoins `json:"data"`
	}

	lists, err := h.services.Task.GetTasksInWork(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) getTasksDone(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskJoins `json:"data"`
	}

	lists, err := h.services.Task.GetTasksDone(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}
