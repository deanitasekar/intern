import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
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

  return (
    <Box sx={{ p: 4 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        margin="normal"
        variant="outlined"
        size="medium"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
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
        margin="normal"
        variant="outlined"
        multiline
        rows={2}
        size="medium"
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Editor" />
          <Tab label="Preview" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 ? (
          <TextField
            fullWidth
            label="Content (Markdown)"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            multiline
            rows={20}
            variant="outlined"
            placeholder="Tulis konten Markdown di sini..."
            sx={{
              "& .MuiInputBase-input": {
                fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                fontSize: "14px",
              },
            }}
          />
        ) : (
          <Paper
            sx={{
              p: 3,
              minHeight: 500,
              maxHeight: 600,
              overflow: "auto",
              border: "1px solid #e0e0e0",
            }}
          >
            <ReactMarkdown
              components={{
                code: ({
                  inline,
                  className,
                  children,
                  ...props
                }: React.DetailedHTMLProps<
                  React.HTMLAttributes<HTMLElement>,
                  HTMLElement
                > & { inline?: boolean }) => (
                  <code
                    style={{
                      backgroundColor: inline ? "#f5f5f5" : "transparent",
                      padding: inline ? "2px 4px" : "0",
                      borderRadius: inline ? "3px" : "0",
                      fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                      fontSize: "14px",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "16px",
                      borderRadius: "4px",
                      overflow: "auto",
                      fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                      fontSize: "14px",
                      margin: "16px 0",
                    }}
                  >
                    {children}
                  </pre>
                ),
                h1: ({ children }) => (
                  <Typography variant="h1" sx={{ margin: "24px 0 16px 0" }}>
                    {children}
                  </Typography>
                ),
                h2: ({ children }) => (
                  <Typography variant="h2" sx={{ margin: "20px 0 12px 0" }}>
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography variant="h3" sx={{ margin: "16px 0 8px 0" }}>
                    {children}
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography sx={{ margin: "8px 0", lineHeight: 1.6 }}>
                    {children}
                  </Typography>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: "4px solid #ddd",
                      paddingLeft: "16px",
                      margin: "16px 0",
                      fontStyle: "italic",
                      color: "#666",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ paddingLeft: "20px", margin: "8px 0" }}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li style={{ margin: "4px 0" }}>{children}</li>
                ),
              }}
            >
              {content || "Tidak ada konten untuk ditampilkan"}
            </ReactMarkdown>
          </Paper>
        )}
      </Box>

      <Box
        sx={{
          mt: 4,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="text"
          startIcon={<Save />}
          onClick={onSave}
          disabled={isLoading || !title.trim() || !content.trim()}
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
        <Button
          variant="contained"
          startIcon={<Cancel />}
          onClick={onCancel}
          disabled={isLoading}
          size="large"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
