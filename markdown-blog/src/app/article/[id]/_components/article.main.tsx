"use client";

import React, { useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Fade,
  Link as MuiLink,
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { ArticleContext } from "@/contexts/article.context";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ArticleDetailMain() {
  const params = useParams();
  const router = useRouter();
  const { getArticle, deleteArticle } = useContext(ArticleContext);

  const articleId = params.id as string;
  const article = getArticle(articleId);

  if (!article) {
    notFound();
  }

  const handleEdit = () => {
    router.push(`/edit/${articleId}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(articleId);
      router.push("/");
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Fade in timeout={400}>
        <Box sx={{ mb: 4 }}>
          <Fade in timeout={1000}>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{ borderRadius: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#d32f2f",
                    "&:hover": {
                      backgroundColor: "#c62828",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Fade>

      <Fade in timeout={800}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            minHeight: 400,
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: 2,
              margin: "16px 0",
            },
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
                    padding: inline ? "2px 6px" : "0",
                    borderRadius: inline ? "4px" : "0",
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    fontSize: inline ? "0.9em" : "14px",
                    color: inline ? "#d63384" : "inherit",
                  }}
                  {...props}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                    borderRadius: "8px",
                    overflow: "auto",
                    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                    fontSize: "14px",
                    margin: "20px 0",
                    border: "1px solid #e9ecef",
                    lineHeight: 1.5,
                  }}
                >
                  {children}
                </pre>
              ),
              h1: ({ children }) => (
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    margin: "32px 0 16px 0",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    margin: "28px 0 14px 0",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{
                    margin: "24px 0 12px 0",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography
                  sx={{
                    margin: "16px 0",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                    color: "text.primary",
                  }}
                >
                  {children}
                </Typography>
              ),
              blockquote: ({ children }) => (
                <Box
                  component="blockquote"
                  sx={{
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    paddingLeft: 3,
                    margin: "24px 0",
                    fontStyle: "italic",
                    color: "text.secondary",
                    backgroundColor: "rgba(33, 150, 243, 0.03)",
                    padding: "16px 0 16px 24px",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  {children}
                </Box>
              ),
              ul: ({ children }) => (
                <Box component="ul" sx={{ paddingLeft: 3, margin: "16px 0" }}>
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box component="ol" sx={{ paddingLeft: 3, margin: "16px 0" }}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Box component="li" sx={{ margin: "8px 0", lineHeight: 1.6 }}>
                  {children}
                </Box>
              ),
              hr: () => <Divider sx={{ margin: "32px 0" }} />,
              a: ({ href, children }) => (
                <MuiLink
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {children}
                </MuiLink>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </Paper>
      </Fade>
    </Container>
  );
}
