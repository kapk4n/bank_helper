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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ArticleContentPage = observer(() => {
  const { id } = useParams(); // ID раздела из URL
  const { sectionid } = useParams(); // ID раздела из URL
  const [articles, setArticles] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: "", content: "", article_id: Number(id) });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8001/api/library/sections/${sectionid}/articles/${id}/files`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setFileList(response.data.files);
      })
      .catch((error) => {
        console.error("Ошибка загрузки файлов:", error);
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
    setNewArticle({ title: "", content: "", article_id: id, section_id: sectionid });
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Берём первый выбранный файл
  };

  const handleCreateArticle = () => {
    if (!newArticle.title || !newArticle.content || !selectedFile) {
      alert("Заполните все поля и выберите файл!");
      return;
    }
    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("content", newArticle.content);
    formData.append("article_id", newArticle.article_id);
    formData.append("section_id", sectionid);
    formData.append("file", selectedFile);

    axios
      .post(`http://localhost:8001/api/library/file/articles`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        fetchArticles();
        handleDialogClose();
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          alert(`Предупреждение: ${error.response.data.error}`);
        } else {
          window.location.reload()
        }
      });
  };

  // Функция для скачивания файла
  const handleDownloadFile = (fileName) => {
    const fileUrl = `http://localhost:8001/api/library/sections/${sectionid}/articles/${id}/files/download/${fileName}`;
    
    axios
      .get(fileUrl, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        responseType: "blob", // Для скачивания файла в виде blob
      })
      .then((response) => {
        // Создаем ссылку для скачивания файла
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Устанавливаем имя для скачивания
        document.body.appendChild(link);
        link.click(); // Инициируем клик по ссылке, чтобы скачать файл
        link.remove(); // Убираем ссылку после скачивания
      })
      .catch((error) => {
        console.error("Ошибка скачивания файла:", error);
        alert("Произошла ошибка при скачивании файла.");
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
            Статья {id}
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={handleDialogOpen}>
            Загрузить файл
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
        <Paper sx={{ padding: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Typography variant="h6">Список файлов:</Typography>
              {fileList.length > 0 ? (
                fileList.map((file, index) => (
                  <Typography key={index}>
                    <Button onClick={() => handleDownloadFile(file)}>{file}</Button>
                  </Typography>
                ))
              ) : (
                <Typography>Файлы не найдены.</Typography>
              )}
            </>
          )}
        </Paper>
      </main>

      {/* Всплывающее окно загрузки файла */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Загрузить файл</DialogTitle>
        <DialogContent>
          <TextField
            label="Заголовок"
            fullWidth
            margin="dense"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          />
          <TextField
            label="Описание"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          />
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Выберите файл
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography>Выбран файл: {selectedFile.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCreateArticle} color="primary">
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ArticleContentPage;
