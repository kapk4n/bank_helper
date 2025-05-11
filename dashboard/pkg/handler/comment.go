package handler

import (
	"dashboard"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) createComment(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.Comment
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	id, err := h.services.Comment.Create(userId, input)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

// func (h *Handler) getAllList(c *gin.Context) {
// 	userId, err := getUserId(c)
// 	if err != nil {
// 		return
// 	}

// 	type getAllListsResponse struct {
// 		Data []dashboard.Desk `json:"data"`
// 	}

// 	lists, err := h.services.Desk.GetAll(userId)
// 	if err != nil {
// 		newErrorResponse(c, http.StatusInternalServerError, err.Error())
// 		return
// 	}

// 	c.JSON(http.StatusOK, getAllListsResponse{
// 		Data: lists,
// 	})
// }

// func (h *Handler) getListById(c *gin.Context) {
// 	userId, err := getUserId(c)
// 	if err != nil {
// 		return
// 	}

// 	id, err := strconv.Atoi(c.Param("id"))

// 	if err != nil {
// 		newErrorResponse(c, http.StatusBadRequest, err.Error())
// 		return
// 	}

// 	list, err := h.services.Desk.GetById(userId, id)
// 	if err != nil {
// 		newErrorResponse(c, http.StatusInternalServerError, err.Error())
// 		return
// 	}

// 	c.JSON(http.StatusOK, list)
// }

// func (h *Handler) updateComment(c *gin.Context) {
// 	userId, err := getUserId(c)
// 	if err != nil {
// 		return
// 	}

// 	id, err := strconv.Atoi(c.Param("id"))
// 	if err != nil {
// 		newErrorResponse(c, http.StatusBadRequest, err.Error())
// 		return
// 	}

// 	var input dashboard.UpdateCommentInput
// 	if err := c.BindJSON(&input); err != nil {
// 		newErrorResponse(c, http.StatusBadRequest, err.Error())
// 		return
// 	}

// 	if err := h.services.Comment.Update(userId, id, input); err != nil {
// 		newErrorResponse(c, http.StatusInternalServerError, err.Error())
// 		return
// 	}

// 	c.JSON(http.StatusOK, statusResponse{"ok"})
// }

func (h *Handler) deleteComment(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err = h.services.Comment.Delete(userId, id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{
		Status: "ok",
	})
}
