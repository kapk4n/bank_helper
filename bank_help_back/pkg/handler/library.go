package handler

import (
	"dashboard"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Получение всех разделов
func (h *Handler) GetSections(c *gin.Context) {
	sections, err := h.services.Library.GetAllSections()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, sections)
}

// Получение всех статей в разделе
func (h *Handler) GetArticlesBySection(c *gin.Context) {
	sectionID, err := strconv.Atoi(c.Param("section_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid section ID"})
		return
	}

	articles, err := h.services.Library.GetArticlesBySection(sectionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, articles)
}

// Получение статьи по ID
func (h *Handler) GetArticleByID(c *gin.Context) {
	articleID, err := strconv.Atoi(c.Param("article_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid article ID"})
		return
	}

	article, err := h.services.Library.GetArticleByID(articleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, article)
}

// Создание нового раздела
func (h *Handler) CreateSection(c *gin.Context) {
	var list dashboard.Section
	author_id, _ := getUserId(c)

	if err := c.BindJSON(&list); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	sectionID, err := h.services.Library.CreateSection(list, author_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"section_id": sectionID})
}

// Создание новой статьи
func (h *Handler) CreateArticle(c *gin.Context) {
	var input dashboard.Article

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	articleID, err := h.services.Library.CreateArticle(input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"article_id": articleID})
}

func (h *Handler) CreateFileArticle(c *gin.Context) {
	title := c.PostForm("title")
	content := c.PostForm("content")
	article_id, _ := strconv.Atoi(c.PostForm("article_id"))
	section_id, _ := strconv.Atoi(c.PostForm("section_id"))

	if title == "" || content == "" || article_id == 0 || section_id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Необходимо указать title, content, section_id и article_id"})
		return
	}

	// Получаем файл из запроса
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не удалось получить файл"})
		return
	}

	// Открываем файл
	src, err := file.Open()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка открытия файла"})
		return
	}
	defer src.Close()

	// Отправляем данные в сервис
	err = h.services.Library.CreateFileArticle(file.Filename, src, article_id, section_id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Файл и данные загружены успешно"})
}

func (h *Handler) GetFileList(c *gin.Context) {
	articleID, err := strconv.Atoi(c.Param("article_id"))
	if err != nil || articleID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный article_id"})
		return
	}

	sectionID, err := strconv.Atoi(c.Param("section_id"))
	if err != nil || sectionID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный section_id"})
		return
	}

	// Получаем список файлов с помощью сервиса
	files, err := h.services.Library.GetFileList(sectionID, articleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Возвращаем список файлов клиенту
	c.JSON(http.StatusOK, gin.H{"files": files})
}

func (h *Handler) DownloadFile(c *gin.Context) {
	// Получаем параметры из запроса
	articleID, err := strconv.Atoi(c.Param("article_id"))
	if err != nil || articleID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный article_id"})
		return
	}

	sectionID, err := strconv.Atoi(c.Param("section_id"))
	if err != nil || sectionID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный section_id"})
		return
	}

	// Получаем имя файла из параметра запроса
	fileName := c.Param("filename")
	fmt.Println(fileName)
	if fileName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Не указано имя файла"})
		return
	}

	// Получаем путь к файлу через сервис
	filePath, err := h.services.Library.DownloadFile(sectionID, articleID, fileName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// Открываем файл
	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при открытии файла"})
		return
	}
	defer file.Close()

	// Отправляем файл клиенту
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", fileName))
	c.Header("Content-Type", "application/octet-stream")
	c.File(filePath)
}

func (h *Handler) CreateWordArticle(c *gin.Context) {
	var input dashboard.WordArticle
	articleID, err := strconv.Atoi(c.Param("id"))

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	articleWordID, err := h.services.Library.CreateWordArticle(input, articleID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"article_id": articleWordID})
}

func (h *Handler) GetWordArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("article_id"))
	var list []dashboard.WordArticle

	fmt.Println(id)
	list, err := h.services.Library.GetWordArticle(id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Article not found"})
		return
	}

	c.JSON(http.StatusOK, list)
}
