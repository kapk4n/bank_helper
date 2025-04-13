package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type ProfileService struct {
	repo repository.Profile
}

func NewProfileService(repo repository.Profile) *ProfileService {
	return &ProfileService{repo: repo}
}

func (s *ProfileService) GetProfile(userId int) ([]dashboard.User, error) {
	return s.repo.GetProfile(userId)
}

func (s *ProfileService) GetGroups(userId int) ([]dashboard.ConGroupsJoin, error) {
	return s.repo.GetGroups(userId)
}
