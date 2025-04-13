import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

const LibrarySectionsPage = observer(() => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = () => {
    setLoading(true);
    axios
      .get("http://localhost:8001/api/library/sections/one", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setSections(response.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки разделов:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewSection({ title: "", content: "" });
  };

  const handleCreateSection = () => {
    axios
      .post("http://localhost:8001/api/library/sections", newSection, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(() => {
        fetchSections();
        handleDialogClose();
      })
      .catch((error) => {
        console.error("Ошибка создания раздела:", error);
      });
  };

  return (
    <>
      {/* Верхняя панель */}
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Библиотека знаний
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={handleDialogOpen}>
            Создать раздел
          </Button>
        </Toolbar>
      </AppBar>

      {/* Боковая панель */}
      <Drawer variant="temporary" open={drawerOpen} onClose={handleDrawerClose}>
        <Toolbar />
        <Divider />
        <List>
          {sections.map((section) => (
            <ListItem button key={section.id} onClick={() => navigate(`/library/content/${section.sections_id}`)}>
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Контент библиотеки */}
      <main style={{ flexGrow: 1, padding: 16 }}>
        {loading ? (
          <CircularProgress />
        ) : sections.length > 0 ? (
          sections.map((section) => (
            <Paper key={section.sections_id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h5">{section.title}</Typography>
              <Typography style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Typography variant="body1">{section.content}</Typography>
                <Typography><Button href={`/library/content/${Number(section.sections_id)}`}> Посмотреть записи</Button> </Typography>
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">Разделов пока нет.</Typography>
        )}
      </main>

      {/* Всплывающее окно создания раздела */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Создать раздел</DialogTitle>
        <DialogContent>
          <TextField
            label="Заголовок"
            fullWidth
            margin="dense"
            value={newSection.title}
            onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
          />
          <TextField
            label="Описание"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newSection.content}
            onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCreateSection} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default LibrarySectionsPage;
