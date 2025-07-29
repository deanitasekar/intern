"use client";

import ArrowBack from "@mui/icons-material/ArrowBack"
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound, useParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDetailArticle } from "../_hooks/detail.hook";

export default function ArticleDetailMain() {
  const params = useParams();
  const articleId = params.id as string;

  const { article, isLoading, handleEdit, handleDelete, handleBack } =
    useDetailArticle({ articleId });

  if (!isLoading && !article) {
    notFound();
  }

  if (isLoading) {
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
      <Fade in timeout={400}>
        <Box sx={{ mb: 4 }}>
          <Fade in timeout={1000}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="text"
                color="inherit"
                startIcon={<ArrowBack />}
                onClick={handleBack}
              >
                Back
              </Button>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{ borderRadius: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Delete />}
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
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
                <Link
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
                </Link>
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
