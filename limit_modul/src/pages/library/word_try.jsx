import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppBar, Toolbar, Typography, Button, Paper, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Настройка редактора
const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "align",
  "color",
  "background",
];

const WordTry = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/library/articles/word/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setContent(response.data[0]?.content || "");
      setTitle(response.data[0]?.title || "");
    } catch (error) {
      console.error("Ошибка загрузки статьи:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8001/api/library/articles/word/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      );
      alert("Статья сохранена!");
    } catch (error) {
      console.error("Ошибка сохранения статьи:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Назад
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Редактор статьи
          </Typography>
          <Button color="inherit" startIcon={<SaveIcon />} onClick={handleSave}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>

      <main style={{ padding: 16 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              {title || "Без названия"}
            </Typography>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              theme="snow"
              placeholder="Начните писать..."
            />
          </Paper>
        )}
      </main>
    </>
  );
});

export default WordTry;