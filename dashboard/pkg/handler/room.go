package handler

import (
	"dashboard"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) createRoom(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.RoomCreating
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	fmt.Print(input)

	id, err := h.services.Room.Create(input, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) getRoom(c *gin.Context) {
	// userId, err := getUserId(c)
	// if err != nil {
	// 	return
	// }
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.RoomGetting `json:"data"`
	}

	lists, err := h.services.Room.GetAll(DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) getLogins(c *gin.Context) {
	// userId, err := getUserId(c)
	// if err != nil {
	// 	return
	// }
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.RoomGetting `json:"data"`
	}

	lists, err := h.services.Room.GetLogins(DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) newUser(c *gin.Context) {
	// userId, err := getUserId(c)
	// if err != nil {
	// 	return
	// }
	deskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.Room `json:"data"`
	}

	var input dashboard.RoomGetting
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	// fmt.Print(input)

	err := h.services.Room.NewUser(input, deskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	// c.JSON(http.StatusOK, getAllListsResponse{
	// 	Data: lists,
	// })
}

func (h *Handler) getAll(c *gin.Context) {
	// userId, err := getUserId(c)
	// if err != nil {
	// 	return
	// }
	// DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []string `json:"data"`
	}

	lists, err := h.services.Room.GetAllUsers()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}

func (h *Handler) deleteUser(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	type UserLogin struct {
		Login string `json:"login"`
	}

	var input UserLogin
	if err := c.BindJSON(&input); err != nil {
		fmt.Println(input)
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		fmt.Println("fasmfla")
		return
	}
	fmt.Println("fasmfla")

	deskId, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, "invalid list id param")
		return
	}

	err = h.services.Room.Delete(deskId, input.Login, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, statusResponse{"ok"})
}
