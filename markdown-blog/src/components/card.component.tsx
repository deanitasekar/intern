import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Article } from "../types/article.type";

interface ArticleCardProps {
  article: Article;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {article.description}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Chip
            label={formatDate(article.createdAt)}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<Visibility />}
          onClick={() => onView(article.id)}
        >
          View
        </Button>
        <Button
          size="small"
          startIcon={<Edit />}
          onClick={() => onEdit(article.id)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          onClick={() => onDelete(article.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
