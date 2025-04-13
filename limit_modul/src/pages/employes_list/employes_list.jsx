import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EmployeeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Храним объект с раскрытыми элементами

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/employee/all", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data.data || []); // Добавлена защита от undefined
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggle = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key], // Изменяем только нужный элемент
    }));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Список сотрудников
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          data.map((direction, index) => (
            <Paper sx={{ mb: 2, p: 2 }} key={`direction_${index}`}>
              <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
                {direction.division}
                <IconButton onClick={() => handleToggle(`direction_${index}`)}>
                  {expanded[`direction_${index}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Typography>
              <Collapse in={expanded[`direction_${index}`]} timeout="auto" unmountOnExit>
                {(direction.departments || []).map((department, index2) => (
                  <Paper sx={{ mt: 2, p: 2 }} key={index2 + 'department'} elevation={3}>
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
                      {department.department}
                      <IconButton onClick={() => handleToggle(`department_${index}_${index2}`)}>
                        {expanded[`department_${index}_${index2}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Typography>
                    <Collapse in={expanded[`department_${index}_${index2}`]} timeout="auto" unmountOnExit>
                      {(department.team || []).map((team, index3) => (
                        <Paper sx={{ mt: 2, p: 2 }} key={index3 + 'team'} elevation={2}>
                          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                            {team.team}
                            <IconButton onClick={() => handleToggle(`team_${index}_${index2}_${index3}`)}>
                              {expanded[`team_${index}_${index2}_${index3}`] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                          </Typography>
                          <Collapse in={expanded[`team_${index}_${index2}_${index3}`]} timeout="auto" unmountOnExit>
                            <List>
                              {(team.employees || []).map((employee) => (
                                <ListItem key={employee.id} component={Link} to={`/employee/profile/${employee.id}`}>
                                  <ListItemText primary={employee.full_name} />
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        </Paper>
                      ))}
                    </Collapse>
                  </Paper>
                ))}
              </Collapse>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
}
