package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type DeskService struct {
	repo repository.Desk
}

func NewDeskService(repo repository.Desk) *DeskService {
	return &DeskService{repo: repo}
}

func (s *DeskService) Create(userId int, list dashboard.Desk) (int, error) {
	return s.repo.Create(userId, list)
}

func (s *DeskService) GetAll(userId int) ([]dashboard.Desk, error) {
	return s.repo.GetAll(userId)
}

func (s *DeskService) GetById(userId, deskId int) (dashboard.Desk, error) {
	return s.repo.GetById(userId, deskId)
}

func (s *DeskService) Delete(userId, deskId int) error {
	return s.repo.Delete(userId, deskId)
}

func (s *DeskService) Update(userId, deskId int, input dashboard.UpdateDeskInput) error {
	if err := input.Validate(); err != nil {
		return err
	}
	return s.repo.Update(userId, deskId, input)
}
