package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type RoomService struct {
	repo repository.Room
}

func NewRoomService(repo repository.Room) *RoomService {
	return &RoomService{repo: repo}
}

func (s *RoomService) Create(list dashboard.RoomCreating, managerId int) (int, error) {
	return s.repo.Create(list, managerId)
}

func (s *RoomService) GetAll(desk_id int) ([]dashboard.RoomGetting, error) {
	return s.repo.GetAll(desk_id)
}

func (s *RoomService) GetLogins(desk_id int) ([]dashboard.RoomGetting, error) {
	return s.repo.GetLogins(desk_id)
}

func (s *RoomService) NewUser(list_Room dashboard.RoomGetting, deskId int) error {
	return s.repo.NewUser(list_Room, deskId)
}

func (s *RoomService) GetAllUsers() ([]string, error) {
	return s.repo.GetAllUsers()
}

func (s *RoomService) Delete(deskId int, user string, user_id int) error {
	return s.repo.Delete(deskId, user, user_id)
}
