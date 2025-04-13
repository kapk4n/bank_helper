import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const SectionContentPage = observer(() => {
  const { id } = useParams(); // ID раздела из URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", section_id: Number(id)});
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, [id]);

  const fetchArticles = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8001/api/library/sections/${id}/articles`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Ошибка загрузки статей:", error);
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
    setNewArticle({ title: "", content: "", section_id: id});
  };

  const handleCreateArticle = () => {
    axios
      .post(
        `http://localhost:8001/api/library/articles`,
        newArticle,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      )
      .then(() => {
        fetchArticles();
        handleDialogClose();
      })
      .catch((error) => {
        console.error("Ошибка создания статьи:", error);
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
            Раздел {id}
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={handleDialogOpen}>
            Создать статью
          </Button>
        </Toolbar>
      </AppBar>

      {/* Боковая панель */}
      <Drawer variant="temporary" open={drawerOpen} onClose={handleDrawerClose}>
        <Toolbar />
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/library")}>
            <ListItemText primary="Назад к разделам" />
          </ListItem>
        </List>
      </Drawer>

      {/* Контент раздела */}
      <main style={{ flexGrow: 1, padding: 16 }}>
        {loading ? (
          <CircularProgress />
        ) : articles !== null ? (
          articles.map((article) => (
            <Paper key={article.articles_id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h5">{article.title}</Typography>
              <Typography  style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}variant="body1">
                  <Typography>{article.content}</Typography>
                  <Typography>
                    <Typography><Button href={`/library/${id}/article/content/${article.articles_id}`}> Посмотреть файлы</Button> </Typography>
                    <Typography><Button href={`/library/try/word/show/${article.articles_id}`}> Посмотреть статью</Button> </Typography>
                  </Typography>
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">В этом разделе пока нет статей.</Typography>
        )}
      </main>

      {/* Всплывающее окно создания статьи */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Создать статью</DialogTitle>
        <DialogContent>
          <TextField
            label="Заголовок"
            fullWidth
            margin="dense"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          />
          <TextField
            label="Содержание"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCreateArticle} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default SectionContentPage;
