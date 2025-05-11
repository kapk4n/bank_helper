package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type Authorization interface {
	CreateUser(user dashboard.User) (int, error)
	GenerateToken(login, password string) (string, error)
	ParseToken(token string) (int, error)
}

type Service struct {
	Authorization
	Desk
	Room
	Comment
	Task
	Profile
}

type Desk interface {
	Create(userId int, list dashboard.Desk) (int, error)
	GetAll(userId int) ([]dashboard.Desk, error)
	GetById(userId, deskId int) (dashboard.Desk, error)
	Delete(userId, deskId int) error
	Update(userId, deskId int, input dashboard.UpdateDeskInput) error
}
type Comment interface {
	Create(userId int, list dashboard.Comment) (int, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	Delete(userId, deskId int) error
	// Update(userId, deskId int, input dashboard.UpdateDeskInput) error
}

type Room interface {
	Create(list dashboard.RoomCreating, managerId int) (int, error)
	GetAll(userId int) ([]dashboard.RoomGetting, error)
	GetLogins(userId int) ([]dashboard.RoomGetting, error)
	NewUser(list_Room dashboard.RoomGetting, deskId int) error
	GetAllUsers() ([]string, error)
	Delete(deskId int, user string, user_id int) error
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	// Update(userId, listId int, input todo.UpdateListInput) error
}

type Profile interface {
	GetProfile(userId int) ([]dashboard.User, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	// Update(userId, listId int, input todo.UpdateListInput) error
}

type Task interface {
	Create(list dashboard.Task, authorId int) (int, error)
	GetAll(taskId, deskId int) ([]dashboard.TaskJoins, error)
	GetById(taskId, userId int) ([]dashboard.Task, error)
	Delete(task_id, userId int) error
	Update(list dashboard.UpdateTaskInput, taskId, authorId int) error

	GetTasksToDo(taskId, deskId int) ([]dashboard.TaskJoins, error)
	GetTasksInWork(taskId, deskId int) ([]dashboard.TaskJoins, error)
	GetTasksDone(taskId, deskId int) ([]dashboard.TaskJoins, error)
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		// Cards:      NewZaprosServiceCard(repos.Cards),
		// Work:       NewZaprosServiceWork(repos.Work),
		// Services:   NewZaprosServiceServices(repos.Services),
		// Materials:  NewZaprosServicesMaterials(repos.Materials),
		// Customers:  NewZaprosServicesCustomer(repos.Customers),
		// Delivers:   NewZaprosServicesDelivers(repos.Delivers),
		// Categories: NewZaprosServicesCategories(repos.Categories),
		// Reques:     NewZaprosServicesRequest(repos.Reques),
		Authorization: NewAuthService(repos.Authorization),
		Desk:          NewDeskService(repos.Desk),
		Room:          NewRoomService(repos.Room),
		Task:          NewTaskService(repos.Task),
		Comment:       NewCommentService(repos.Comment),
		Profile:       NewProfileService(repos.Profile),
		// //TodoItem:      NewTodoItemService(repos.TodoItem, repos.TodoList),
	}
}
