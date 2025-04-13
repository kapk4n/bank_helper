import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeProfile() {
  const { id } = useParams(); // Получаем ID сотрудника из URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Запрос на получение данных о сотруднике по ID
    axios
      .get(`http://localhost:8001/api/employee/one/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setEmployee(response.data.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setError("Ошибка загрузки данных");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!employee) {
    return <Typography>Сотрудник не найден</Typography>;
  }

  // Структура для хлебных крошек
  const breadcrumbs = [
    { label: employee.division, link: `/division/${employee.division_id}` },
    { label: employee.department, link: `/department/${employee.department_id}` },
    { label: employee.team, link: `/team/${employee.team_id}` },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Профиль сотрудника
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => (
              <MuiLink key={index} color="inherit" href={breadcrumb.link}>
                {breadcrumb.label}
              </MuiLink>
            ))}
          </Breadcrumbs>

          <Typography variant="h4" sx={{ mt: 2 }}>
            {employee.full_name}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Должность: {employee.position}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Отдел: {employee.division} / {employee.department} / {employee.team}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
