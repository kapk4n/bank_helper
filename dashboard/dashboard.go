package dashboard

import "errors"

type Desk struct {
	Id          int    `json:"desk_id" db:"desk_id"`
	Title       string `json:"title" db:"title" binding:"required"`
	Description string `json:"description" db:"description"`
	Changeable  string `json:"changeable" db:"changeable"`
	StartDate   string `json:"start_date" db:"start_date"`
}

type Room struct {
	Id        int
	UserId    int
	ManagerId int
	ListId    int
	Privacy   string
}

type RoomGetting struct {
	Id        int    `json:"room_id" db:"room_id"`
	UserId    int    `json:"user_id" db:"user_id"`
	UserLogin string `json:"login" db:"login"`
	ManagerId int    `json:"manager_id" db:"manager_id"`
}

type Comment struct {
	Id       int    `json:"comment_id" db:"comment_id"`
	TaskId   int    `json:"task_id" db:"task_id"`
	AuthorId int    `json:"comment_author_id" db:"comment_author_id"`
	Message  string `json:"message" db:"message"`
}
type RoomCreating struct {
	DeskId int    `json:"desk_id"`
	Array  string `json:"array"`
}

type Task struct {
	TaskId         int    `json:"task_id" db:"task_id"`
	Title          string `json:"title" db:"title"`
	Description    string `json:"description" db:"description"`
	Priority       int    `json:"priority_" db:"priority"`
	PriorityString string `json:"priority" db:"priority_string"`
	EmployeeId     int    `json:"employee_id" db:"employee_id"`
	EmployeeLogin  string `json:"login" db:"login"`
	DeskId         int    `json:"desk_id" db:"desk_id"`
	Status         string `json:"status" db:"status"`
	AuthorId       int    `json:"author_id" db:"author_id"`
	StartDate      string `json:"start_date" db:"start_date"`
}

type TaskJoins struct {
	TaskId         int    `json:"task_id" db:"task_id"`
	Title          string `json:"title" db:"title"`
	Description    string `json:"description" db:"description"`
	Priority       int    `json:"priority_" db:"priority"`
	PriorityString string `json:"priority" db:"priority_string"`
	EmployeeId     int    `json:"employee_id" db:"employee_id"`
	DeskId         int    `json:"desk_id" db:"desk_id"`
	AuthorId       int    `json:"author_id" db:"author_id"`
	StartDate      string `json:"start_date" db:"start_date"`
	Status         string `json:"status" db:"status"`
	EmployeeLogin  string `json:"employee_login" db:"employee_login"`
	EmployeeEmail  string `json:"employee_email" db:"employee_email"`
	EmployeePhone  string `json:"employee_phone" db:"employee_phone"`
	AuthorLogin    string `json:"author_login" db:"author_login"`
	AuthorEmail    string `json:"author_email" db:"author_email"`
	AuthorPhone    string `json:"author_phone" db:"author_phone"`
}

type UpdateTaskInput struct {
	Title          *string `json:"title"`
	Description    *string `json:"description"`
	Status         *string `json:"status"`
	Priority       *int    `json:"priority_" db:"priority"`
	PriorityString *string `json:"priority" db:"priority_string"`
	EmployeeId     *int    `json:"employee_id" db:"employee_id"`
	EmployeeLogin  *string `json:"login" db:"login"`
}

type UpdateDeskInput struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Changeable  *string `json:"changeable"`
}

func (i UpdateDeskInput) Validate() error {
	if i.Title == nil && i.Description == nil {
		return errors.New("update structure has no values")
	}

	return nil
}

// type Comment struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// 	Status      *string `json:"status"`
// 	Priority    *string `json:"priority" db:"priority"`
// }

// type TodoItem struct {
// 	Id          int    `json:"id" db:"id"`
// 	Title       string `json:"title" db:"title" binding:"required"`
// 	Description string `json:"description" db:"description"`
// 	Done        bool   `json:"done" db:"done"`
// }

// type ListsItem struct {
// 	Id     int
// 	ListId int
// 	ItemId int
// }

// type UpdateListInput struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// }

// func (i UpdateListInput) Validate() error {
// 	if i.Title == nil && i.Description == nil {
// 		return errors.New("update structure has no values")
// 	}

// 	return nil
// }

// type UpdateItemInput struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// 	Done        *bool   `json:"done"`
// }

// func (i UpdateItemInput) Validate() error {
// 	if i.Title == nil && i.Description == nil && i.Done == nil {
// 		return errors.New("update structure has no values")
// 	}

// 	return nil
// }
