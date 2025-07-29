"use client";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useParams } from "next/navigation";
import { MarkdownEditor } from "@/components/editor.component";
import { useEditArticle } from "../_hooks/edit.hook";
import { notFound } from "next/navigation";

export default function EditArticlePage() {
  const params = useParams();
  const articleId = params.id as string;

  const {
    article,
    title,
    description,
    content,
    isLoading,
    showSuccess,
    isInitialized,
    error,
    setTitle,
    setDescription,
    setContent,
    handleSave,
    handleCancel,
    handleBack,
    handleCloseError,
  } = useEditArticle({ articleId });

  if (isInitialized && !article) {
    notFound();
  }

  if (!isInitialized) {
    return (
      <Container maxWidth="sm">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{
            minHeight: "60vh",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                padding: "3px",
                background:
                  "linear-gradient(45deg, transparent, rgba(33, 150, 243, 0.1))",
                animation: "pulse 2s ease-in-out infinite",
              },
              "@keyframes pulse": {
                "0%, 100%": {
                  opacity: 0.8,
                  transform: "scale(1)",
                },
                "50%": {
                  opacity: 0.4,
                  transform: "scale(1.05)",
                },
              },
            }}
          >
            <CircularProgress
              size={48}
              thickness={3.6}
              sx={{
                color: "primary.main",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 500,
                color: "text.primary",
                mb: 1,
                letterSpacing: "0.02em",
              }}
            >
              Loading
            </Typography>
          </Box>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
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
              Article updated successfully!
            </Alert>
          </Box>
        </Fade>
      )}

      {error && (
        <Box sx={{ mb: 3 }}>
          <Alert severity="error" onClose={handleCloseError} sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      <Fade in timeout={400}>
        <Box sx={{ mb: 4 }}>
          <Fade in timeout={1000}>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="text"
                color="inherit"
                startIcon={<ArrowBack />}
                onClick={handleBack}
              >
                Back
              </Button>
            </Box>
          </Fade>
        </Box>
      </Fade>

      <Fade in timeout={800}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
            Edit Article
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
