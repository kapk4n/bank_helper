package repository

import (
	"dashboard"
	"io"

	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user dashboard.User) (int, error)
	GetUser(login, password string) (dashboard.User, error)
}

type Profile interface {
	GetProfile(userId int) ([]dashboard.User, error)
	GetGroups(userId int) ([]dashboard.ConGroupsJoin, error)
}

type Task interface {
	GetById(task_id int) ([]dashboard.Task, error)
	GetAllTaskByTest(task_id, user_id int) ([]dashboard.Task, error)
	GetUserTaskResultById(test_id, author_id int) ([]dashboard.TestResult, error)
	GetUserTaskResultByTaskId(task_id, author_id int) ([]dashboard.TestResult, error)
	GetTaskVariants(test_id int) ([]dashboard.TaskVariants, error)
	GetMinTaskByTest(test_id int) ([]dashboard.MinTask, error)
	Create(list dashboard.TaskMerged) (int, error)
	CreateTaskResults(userId int, list dashboard.TaskResponse) (int, error)
	Delete(task_id, authorId int) error
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
	GetById(todo_id int) ([]dashboard.Todo, error)
	GetAllAuthorTodos(todo_id int) ([]dashboard.Todo, error)
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

type Repository struct {
	Authorization
	Task
	Profile
	Test
	Todo
	Library
	Employee
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		// Cards:      NewZaprosPostgres(db),
		// Work:       NewZapros2Postgres(db),
		// Services:   NewServicesPostgres(db),
		// Materials:  NewMaterialsPostgres(db),
		// Customers:  NewCustomerPostgres(db),
		// Delivers:   NewDeliverPostgres(db),
		// Categories: newCategoriesPostgres(db),
		Authorization: NewAuthPostgres(db),
		Task:          NewTaskPostgres(db),
		Profile:       NewProfilePostgres(db),
		Test:          NewTestPostgres(db),
		Todo:          NewTodoPostgres(db),
		Library:       NewLibraryPostgres(db),
		Employee:      NewEmployeePostgres(db),
		//TodoItem:      NewTodoItemPostgres(db),
	}
}
