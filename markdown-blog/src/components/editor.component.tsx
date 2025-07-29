import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Save, Cancel } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  title: string;
  description: string;
  content: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  title,
  description,
  content,
  onTitleChange,
  onDescriptionChange,
  onContentChange,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const markdownComponents = {
    code: (props: any) => {
      const { children, inline } = props;
      return inline ? (
        <Box 
          component="code" 
          sx={{ 
            bgcolor: "grey.100",
            color: "primary.main",
            px: 0.5,
            py: 0.25,
            borderRadius: 1,
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '0.875rem',
          }}
        >
          {children}
        </Box>
      ) : (
        <code style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}>
          {children}
        </code>
      );
    },
    pre: ({ children }: any) => (
      <Box 
        component="pre" 
        sx={{ 
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
          p: 2,
          overflow: "auto",
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '0.875rem',
          my: 2,
          boxShadow: 1,
        }}
      >
        {children}
      </Box>
    ),
    h1: ({ children }: any) => (
      <Typography variant="h1" sx={{ mt: 3, mb: 2 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }: any) => (
      <Typography variant="h2" sx={{ mt: 2.5, mb: 1.5 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: any) => (
      <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    p: ({ children }: any) => (
      <Typography variant="body1" sx={{ my: 1, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
    blockquote: ({ children }: any) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: 4,
          borderColor: "primary.main",
          bgcolor: "rgba(33, 150, 243, 0.03)",
          pl: 2,
          py: 1.5,
          my: 2,
          borderRadius: "0 12px 12px 0",
          fontStyle: "italic",
          color: "text.secondary",
        }}
      >
        {children}
      </Box>
    ),
    ul: ({ children }: any) => (
      <Box component="ul" sx={{ pl: 2.5, my: 1, color: "text.secondary" }}>
        {children}
      </Box>
    ),
    ol: ({ children }: any) => (
      <Box component="ol" sx={{ pl: 2.5, my: 1, color: "text.secondary" }}>
        {children}
      </Box>
    ),
    li: ({ children }: any) => (
      <Box component="li" sx={{ mb: 0.5 }}>
        {children}
      </Box>
    ),
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        variant="outlined"
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.5,
            fontSize: "1.1rem",
            fontWeight: 500,
          },
        }}
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        variant="outlined"
        multiline
        rows={2}
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.5,
          },
        }}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Editor" />
          <Tab label="Preview" />
        </Tabs>
      </Box>

      <Box>
        {tabValue === 0 ? (
          <TextField
            fullWidth
            label="Content (Markdown)"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            multiline
            rows={20}
            variant="outlined"
            placeholder="Write your content"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
              "& .MuiInputBase-input": {
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: "0.875rem",
                lineHeight: 1.5,
              },
            }}
          />
        ) : (
          <Paper
            elevation={1}
            sx={{
              p: 3,
              minHeight: 500,
              maxHeight: 600,
              overflow: "auto",
              borderRadius: 1.5,
              border: 1,
              borderColor: "divider",
            }}
          >
            <ReactMarkdown components={markdownComponents as any}>
              {content || "Tidak ada konten untuk ditampilkan"}
            </ReactMarkdown>
          </Paper>
        )}
      </Box>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{
          pt: 2,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={onSave}
          disabled={isLoading || !title.trim() || !content.trim()}
          size="large"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          {isLoading ? "Saving" : "Save"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={onCancel}
          disabled={isLoading}
          size="large"
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};