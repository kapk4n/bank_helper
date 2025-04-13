package handler

import (
	"dashboard"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) getTaskById(c *gin.Context) {
	Taskid, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.Task `json:"data"`
	}

	lists, err := h.services.Task.GetById(Taskid)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetAllTaskByTest(c *gin.Context) {
	Taskid, _ := strconv.Atoi(c.Param("id"))
	user_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.Task `json:"data"`
	}

	lists, err := h.services.Task.GetAllTaskByTest(Taskid, user_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetUserTaskResultById(c *gin.Context) {
	test_id, _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.TestResult `json:"data"`
	}

	lists, err := h.services.Task.GetUserTaskResultById(test_id, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetUserTaskResultByTaskId(c *gin.Context) {
	test_id, _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.TestResult `json:"data"`
	}

	lists, err := h.services.Task.GetUserTaskResultByTaskId(test_id, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetMinTaskByTest(c *gin.Context) {
	test_id, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.MinTask `json:"data"`
	}

	lists, err := h.services.Task.GetMinTaskByTest(test_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) GetTaskVariants(c *gin.Context) {
	test_id, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskVariants `json:"data"`
	}

	lists, err := h.services.Task.GetTaskVariants(test_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) CreateTask(c *gin.Context) {

	var input dashboard.TaskMerged
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Task.Create(input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) CreateTaskResults(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.TaskResponse
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Task.CreateTaskResults(userId, input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
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
