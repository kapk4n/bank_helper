package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Получить список всех сотрудников
func (h *Handler) GetAllEmployees(c *gin.Context) {
	// Получаем всех сотрудников
	employees, err := h.services.Employee.GetAllEmployees()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка загрузки данных"})
		return
	}

	// Структура для группировки сотрудников по разделам, департаментам и командам
	var result []map[string]interface{}

	// Группируем сотрудников по подразделениям (division)
	for _, employee := range employees {
		// Проверяем, существует ли уже подразделение в списке
		var divisionIndex int
		foundDivision := false
		for i, division := range result {
			if division["division"] == employee.Division {
				divisionIndex = i
				foundDivision = true
				break
			}
		}

		if !foundDivision {
			// Если подразделение не найдено, создаем новое
			divisionIndex = len(result)
			result = append(result, map[string]interface{}{
				"division":    employee.Division,
				"departments": []map[string]interface{}{},
			})
		}

		// Теперь ищем или создаем департамент внутри найденного подразделения
		division := result[divisionIndex]
		var departmentIndex int
		foundDepartment := false
		for i, department := range division["departments"].([]map[string]interface{}) {
			if department["department"] == employee.Department {
				departmentIndex = i
				foundDepartment = true
				break
			}
		}

		if !foundDepartment {
			// Если департамент не найден, создаем новый
			departmentIndex = len(division["departments"].([]map[string]interface{}))
			division["departments"] = append(division["departments"].([]map[string]interface{}), map[string]interface{}{
				"department": employee.Department,
				"team":       []map[string]interface{}{},
			})
		}

		// Теперь ищем или создаем команду внутри найденного департамента
		department := division["departments"].([]map[string]interface{})[departmentIndex]
		var teamIndex int
		foundTeam := false
		for i, team := range department["team"].([]map[string]interface{}) {
			if team["team"] == employee.Team {
				teamIndex = i
				foundTeam = true
				break
			}
		}

		if !foundTeam {
			// Если команда не найдена, создаем новую
			teamIndex = len(department["team"].([]map[string]interface{}))
			department["team"] = append(department["team"].([]map[string]interface{}), map[string]interface{}{
				"team":      employee.Team,
				"employees": []map[string]interface{}{},
			})
		}

		// Добавляем сотрудника в команду
		team := department["team"].([]map[string]interface{})[teamIndex]
		team["employees"] = append(team["employees"].([]map[string]interface{}), map[string]interface{}{
			"id":        employee.UserId,
			"full_name": employee.FullName,
		})
	}

	// Отправляем сформированную структуру данных
	c.JSON(http.StatusOK, gin.H{"data": result})
}

// Получить сотрудника по ID
func (h *Handler) GetEmployeeByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный ID"})
		return
	}

	employee, err := h.services.Employee.GetEmployeeByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Сотрудник не найден"})
		return
	}

	// Формируем структуру для одного сотрудника
	result := map[string]interface{}{
		"data": map[string]interface{}{
			"id":         employee.UserId,
			"full_name":  employee.FullName,
			"position":   employee.Position,
			"team":       employee.Team,
			"department": employee.Department,
			"division":   employee.Division,
		},
	}

	c.JSON(http.StatusOK, result)
}
