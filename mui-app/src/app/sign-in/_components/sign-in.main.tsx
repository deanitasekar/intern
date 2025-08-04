"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import SignInForm from "./sign-in.component";

export default function SignInMain() {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{
          minHeight: "100vh",
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
            color="primary"
            sx={{
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>

        <Box>
          <Typography variant="h6" component="h2" color="textPrimary">
            Loading
          </Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <>
      {isDesktop ? (
        <Stack direction="row" sx={{ height: "100vh" }}>
          <Box
            sx={{
              flex: "778",
              backgroundImage: "url(/side-page.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          />
          
          <Box
            sx={{
              flex: "588",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.default",
              p:0,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                backgroundColor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                m:0,
              }}
            >
              <SignInForm />
            </Paper>
          </Box>
        </Stack>
      ) : (
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            py: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <SignInForm />
          </Paper>
        </Container>
      )}
    </>
  );
}