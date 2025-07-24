"use client";

import React, { useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "../../../components/editor.component";
import { useArticle } from "../../../hooks/use-article.hook";

export const CreateMain: React.FC = () => {
  const router = useRouter();
  const { addArticle } = useArticle();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(
    "# Article Title\n\nWrite your article content here..."
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      addArticle({
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
      });

      router.push("/");
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            Back
          </Button>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" align="center">
            Create New Article
          </Typography>
          <MarkdownEditor
            title={title}
            description={description}
            content={content}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onContentChange={setContent}
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateMain;
