package service

import (
	"dashboard"
	"dashboard/pkg/repository"
	"io"
)

type Authorization interface {
	CreateUser(user dashboard.User) (int, error)
	GenerateToken(login, password string) (string, error)
	ParseToken(token string) (int, error)
}

type Service struct {
	Authorization
	Task
	Profile
	Test
	Todo
	Library
	Employee
}

type Profile interface {
	GetProfile(userId int) ([]dashboard.User, error)
	GetGroups(userId int) ([]dashboard.ConGroupsJoin, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	// Update(userId, listId int, input todo.UpdateListInput) error
}

type Task interface {
	GetById(taskId int) ([]dashboard.Task, error)
	GetAllTaskByTest(taskId, user_id int) ([]dashboard.Task, error)
	GetUserTaskResultById(test_id, author_id int) ([]dashboard.TestResult, error)
	GetUserTaskResultByTaskId(task_id, author_id int) ([]dashboard.TestResult, error)
	GetTaskVariants(test_id int) ([]dashboard.TaskVariants, error)
	GetMinTaskByTest(test_id int) ([]dashboard.MinTask, error)
	Create(list dashboard.TaskMerged) (int, error)
	CreateTaskResults(userId int, list dashboard.TaskResponse) (int, error)
	Delete(task_id, user_id int) error
}

type Test interface {
	GetTestById(input dashboard.Test, author_id int) ([]dashboard.Test, error)
	GetAllAuthorTests(input dashboard.Test, author_id int) ([]dashboard.Test, error)
	GetAllTests(input dashboard.Test, author_id int) ([]dashboard.Test, error)
	GetPercentTest(test_id, author_id int) ([]dashboard.Percentage, error)
	CreateTest(input dashboard.Test, author_id int) (int, error)
	CloseTest(input dashboard.Test, author_id int) error
	DeleteTest(input dashboard.Test, author_id int) error
	GetAllUserTests(author_id int) ([]dashboard.UserTests, error)
}

type Todo interface {
	GetById(todoId int) ([]dashboard.Todo, error)
	GetAllAuthorTodos(todoId int) ([]dashboard.Todo, error)
	GetInWorkTodos(todo_id int) ([]dashboard.Todo, error)
	GetFinishedTodos(todo_id int) ([]dashboard.Todo, error)
	CreateTodo(input dashboard.Todo, author_id int) (int, error)
}

type Library interface {
	GetAllSections() ([]dashboard.Section, error)
	GetArticlesBySection(sectionID int) ([]dashboard.Article, error)
	GetArticleByID(articleID int) (dashboard.Article, error)
	CreateSection(list dashboard.Section, author_id int) (int, error)
	CreateArticle(input dashboard.Article) (int, error)
	CreateFileArticle(filename string, file io.Reader, article_id, section_id int) error
	GetFileList(sectionID, articleID int) ([]string, error)
	DownloadFile(sectionID, articleID int, fileName string) (string, error)
	CreateWordArticle(list dashboard.WordArticle, articleID int) (int, error)
	GetWordArticle(articleID int) ([]dashboard.WordArticle, error)
}

type Employee interface {
	GetAllEmployees() ([]dashboard.Employee, error)
	GetEmployeeByID(id int) (dashboard.Employee, error)
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
		Task:          NewTaskService(repos.Task),
		Profile:       NewProfileService(repos.Profile),
		Test:          NewTestService(repos.Test),
		Todo:          NewTodoService(repos.Todo),
		Library:       NewLibraryService(repos.Library),
		Employee:      NewEmployeeService(repos.Employee),
		// //TodoItem:      NewTodoItemService(repos.TodoItem, repos.TodoList),
	}
}
