package dashboard

import "errors"

type Test struct {
	TestId       int    `json:"test_id" db:"test_id"`
	TestTitle    string `json:"test_title" db:"test_title"`
	TestCategory string `json:"test_category" db:"test_category"`
	AuthorId     int    `json:"author_id" db:"author_id"`
	GroupId      int    `json:"group_id" db:"group_id"`
	Begindate    string `json:"begindate" db:"begindate"`
	Enddate      string `json:"enddate" db:"enddate"`
}

type UserTests struct {
	TestId       int    `json:"test_id" db:"test_id"`
	TestTitle    string `json:"test_title" db:"test_title"`
	TestCategory string `json:"test_category" db:"test_category"`
	AuthorId     int    `json:"author_id" db:"author_id"`
	Begindate    string `json:"begindate" db:"begindate"`
	Enddate      string `json:"enddate" db:"enddate"`
	UserId       int    `json:"user_id" db:"user_id"`
	GroupId      int    `json:"group_id" db:"group_id"`
}

type Todo struct {
	TodoId      int    `json:"todo_id" db:"todo_id"`
	StartDate   string `json:"start_date" db:"start_date"`
	Title       string `json:"title" db:"title"`
	Description string `json:"description" db:"description"`
	Priority    int    `json:"priority" db:"priority"`
	UserId      int    `json:"user_id" db:"user_id"`
	Status      string `json:"status" db:"status"`
}

type TestResult struct {
	TestsResultId int    `json:"tests_result_id" db:"tests_result_id"`
	UserId        int    `json:"user_id" db:"user_id"`
	TaskId        int    `json:"task_id" db:"task_id"`
	AnswerResult  string `json:"answer_result" db:"answer_result"`
	AnswerCorrect bool   `json:"answer_correct" db:"answer_correct"`
	TaskQuestion  string `json:"task_question" db:"task_question"`
	TaskAnswer    string `json:"task_answer" db:"task_answer"`
	TestId        int    `json:"test_id" db:"test_id"`
	TestTitle     string `json:"test_title" db:"test_title"`
	TestCategory  string `json:"test_category" db:"test_category"`
	AuthorId      int    `json:"author_id" db:"author_id"`
	GroupId       int    `json:"group_id" db:"group_id"`
	Begindate     string `json:"begindate" db:"begindate"`
	Enddate       string `json:"enddate" db:"enddate"`
	ChosenVariant int    `json:"chosen_variant" db:"chosen_variant"`
	ResultDate    string `json:"result_date" db:"result_date"`
}

type Percentage struct {
	Num float32 `json:"num" db:"num"`
}

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
	TaskId       int    `json:"task_id" db:"task_id"`
	TaskQuestion string `json:"task_question" db:"task_question"`
	TaskAnswer   string `json:"task_answer" db:"task_answer"`
	TestId       int    `json:"test_id" db:"test_id"`
}

type TaskVariants struct {
	TaskVariantsId int    `json:"task_variants_id" db:"task_variants_id"`
	TaskId         int    `json:"task_id" db:"task_id"`
	TaskVariant    string `json:"task_variant" db:"task_variant"`
	CorrectVariant bool   `json:"correct_variant" db:"correct_variant"`
}

type TaskMerged struct {
	TaskId         int      `json:"task_id" db:"task_id"`
	TaskQuestion   string   `json:"task_question" db:"task_question"`
	TaskAnswer     string   `json:"task_answer" db:"task_answer"`
	TestId         int      `json:"test_id" db:"test_id"`
	TaskVariantsId int      `json:"task_variants_id" db:"task_variants_id"`
	TaskVariant    string   `json:"task_variant" db:"task_variant"`
	CorrectVariant string   `json:"correct_variant" db:"correct_variant"`
	Response       []string `json:"response" db:"response"`
}

type TaskResponse struct {
	Responses []TaskResponseMini `json:"responses"`
}
type TaskResponseMini struct {
	IDTask        int    `json:"id_task"`
	IDTaskVariant string `json:"id_task_variant"`
}
type MinTask struct {
	Min int `json:"min" db:"min"`
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
type ConGroupsJoin struct {
	GroupId        int    `json:"group_id" db:"group_id"`
	GroupName      string `json:"group_name" db:"group_name"`
	ConGroupUserId int    `json:"con_group_user_id" db:"con_group_user_id"`
	UserId         int    `json:"user_id" db:"user_id"`
}

type Section struct {
	SectionId  int    `db:"sections_id" json:"sections_id"`
	Title      string `db:"title" json:"title"`
	Content    string `db:"content" json:"content"`
	AuthorId   string `db:"author_id" json:"author_id"`
	Created_at string `db:"created_at" json:"created_at"`
	Updated_at string `db:"updated_at" json:"updated_at"`
	GroupId    int    `json:"group_id" db:"group_id"`
}

type Article struct {
	ArticleId int    `db:"articles_id" json:"articles_id"`
	Title     string `db:"title" json:"title"`
	Content   string `db:"content" json:"content"`
	SectionID int    `db:"section_id" json:"section_id"`
}

type WordArticle struct {
	ArticleWordId int    `db:"articles_word_id" json:"articles_word_id"`
	Title         string `db:"title" json:"title"`
	Content       string `db:"content" json:"content"`
	ArticleID     int    `db:"articles_id" json:"articles_id"`
}

type Employee struct {
	UserId     int    `db:"user_id" json:"user_id"`
	FullName   string `db:"full_name" json:"full_name"`
	Position   string `db:"position" json:"position"`
	Team       string `db:"team" json:"team"`
	Department string `db:"department" json:"department"`
	Division   string `db:"division" json:"division"`
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
