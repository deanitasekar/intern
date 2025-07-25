"use client";

import React from "react";
import { Container, Typography, Box, Button, Paper, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { MarkdownEditor } from "../../../components/editor.component";
import { useCreate } from "../_hooks/create.hook";

export const CreateMain: React.FC = () => {
  const {
    title,
    description,
    content,
    isLoading,
    error,
    setTitle,
    setDescription,
    setContent,
    handleSave,
    handleCancel,
    handleBack,
    handleCloseError,
  } = useCreate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            Back
          </Button>
        </Box>

        {error && (
          <Box sx={{ mb: 3 }}>
            <Alert 
              severity="error" 
              onClose={handleCloseError}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Box>
        )}

        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
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