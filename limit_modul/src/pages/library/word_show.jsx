import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticleViewer = observer(() => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/library/articles/word/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response) => {
        setContent(response.data[0]?.content || "");
      })
      .catch((error) => {
        console.error("Ошибка загрузки статьи:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => window.history.back()} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Просмотр статьи
          </Typography>
          <Button color="inherit" sx={{ display: "flex", alignItems: "center" }} href={`/library/try/word/${id}`}>
            <EditIcon sx={{ fontSize: 22, mr: 1 }} /> Редактировать
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
        ) : (
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Содержимое статьи
            </Typography>
            {content ? (
              <ReactQuill value={content} readOnly={true} theme="bubble" />
            ) : (
              <Typography color="textSecondary">Статья не содержит документа</Typography>
            )}
          </Paper>
        )}
      </Container>
    </>
  );
});

export default ArticleViewer;
