"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
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
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Box sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="text"
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Back
          </Button>
        </Stack>

        {error && (
          <Box sx={{ mb: 3 }}>
            <Alert severity="error" onClose={handleCloseError} sx={{ mb: 2 }}>
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
