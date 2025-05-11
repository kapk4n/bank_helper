package handler

import (
	"dashboard"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetProfile(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	type getAllListsResponse struct {
		Data []dashboard.User `json:"data"`
	}

	lists, err := h.services.Profile.GetProfile(userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}
