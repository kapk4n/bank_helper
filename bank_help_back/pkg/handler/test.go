package handler

import (
	"dashboard"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetTestById(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	list, err := h.services.Test.GetTestById(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: list,
	})
}

func (h *Handler) GetAllAuthorTests(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	list, err := h.services.Test.GetAllAuthorTests(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: list,
	})
}

func (h *Handler) GetAllTests(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	list, err := h.services.Test.GetAllTests(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: list,
	})
}

func (h *Handler) GetAllUserTests(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.UserTests `json:"data"`
	}

	list, err := h.services.Test.GetAllUserTests(author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: list,
	})
}

func (h *Handler) GetPercentTest(c *gin.Context) {
	test_id, _ := strconv.Atoi(c.Param("id"))
	author_id, _ := getUserId(c)

	type getAllListsResponse struct {
		Data []dashboard.Percentage `json:"data"`
	}

	lists, err := h.services.Test.GetPercentTest(test_id, author_id)
	if err != nil {
		if err.Error() != "pq: division by zero" {
			newErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		}
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) CreateTest(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	id, err := h.services.Test.CreateTest(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) CloseTest(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	err = h.services.Test.CloseTest(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	// c.JSON(http.StatusOK, getAllListsResponse{
	// 	Data: list,
	// })
}

func (h *Handler) DeleteTest(c *gin.Context) {
	author_id, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Test
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.Test `json:"data"`
	}

	err = h.services.Test.DeleteTest(input, author_id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	// c.JSON(http.StatusOK, getAllListsResponse{
	// 	Data: list,
	// })
}
