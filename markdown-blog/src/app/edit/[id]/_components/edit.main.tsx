"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Fade,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { MarkdownEditor } from "@/components/editor.component";
import { useEditArticle } from "../_hooks/edit-hook";
import { notFound } from "next/navigation";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const {
    article,
    title,
    description,
    content,
    isLoading,
    showSuccess,
    isInitialized,
    setTitle,
    setDescription,
    setContent,
    handleSave,
    handleCancel,
  } = useEditArticle({ articleId });

  if (!article) {
    notFound();
  }

  if (!isInitialized) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      {showSuccess && (
        <Fade in={showSuccess}>
          <Box sx={{ mb: 4 }}>
            <Alert
              severity="success"
              sx={{
                borderRadius: 3,
                fontWeight: 500,
              }}
            >
              Article updated successfully! Redirecting...
            </Alert>
          </Box>
        </Fade>
      )}

      <Fade in timeout={400}>
        <Box sx={{ mb: 4 }}>
          <Fade in timeout={1000}>
            <Box sx={{ mt: 4 }}>
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
          </Fade>
        </Box>
      </Fade>

      <Fade in timeout={800}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" align="center">
            Create Article
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
      </Fade>
    </Container>
  );
}
