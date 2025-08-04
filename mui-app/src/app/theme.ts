"use client";

import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3F51B5",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: alpha("#000000", 0.87),
      secondary: alpha("#000000", 0.54),
    },
    error: {
      main: "#F44336",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    divider: alpha("#000000", 0.12),
  },
  typography: {
    fontFamily: '"var(--font-roboto)", sans-serif',
    h1: {
      fontSize: "6rem",
      fontWeight: 300,
      lineHeight: "112px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    h2: {
      fontSize: "3.75rem",
      fontWeight: 300,
      lineHeight: "72px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 400,
      lineHeight: "56px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    h4: {
      fontSize: "2.125rem",
      fontWeight: 400,
      lineHeight: "42px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: "29px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: "32px",
      letterSpacing: "0.16px",
      textAlign: "center",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "0.16px",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.16px",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "28px",
      letterSpacing: "0.16px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "22px",
      letterSpacing: "0.16px",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.16px",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 700,
      lineHeight: "32px",
      letterSpacing: "0.16px",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: "18px",
      letterSpacing: "0.16px",
    },
    
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease-in-out",
        },
        img: {
          objectFit: "cover",
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
          "&.MuiCardContent-root": {
            display: "flex",
            flexDirection: "column",
            height: "100%",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "18px",
          letterSpacing: "0.16px",
          textTransform: "uppercase",
          fontFamily: "Roboto",
          fontStyle: "normal",
          boxShadow: "none",

          "&:hover": {
            boxShadow: "0 4px 12px rgba(48, 49, 50, 0.3)",
          },

          "&:focus": {
            boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.2)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "50%",
          padding: "8px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: alpha("#000000", 0.04),
          },
        },
        sizeSmall: {
          padding: "4px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontSize: "0.75rem",
          fontWeight: 500,
          height: 24,
        },
        filled: {
          backgroundColor: "#E3F2FD",
          color: "#1976D2",
        },
        colorPrimary: {
          backgroundColor: "#3F51B5",
          color: "#FFFFFF",
          "& .MuiChip-icon": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          borderBottom: "1px solid #E0E0E0",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "64px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
          "@media (min-width: 600px)": {
            paddingLeft: "32px",
            paddingRight: "32px",
          },
        },
        maxWidthLg: {
          maxWidth: "1200px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: "16px",
        },
        h2: {
          "@media (max-width: 600px)": {
            fontSize: "2.5rem",
          },
        },
        h6: {
          "@media (max-width: 600px)": {
            fontSize: "1rem",
          },
        },
        body1: {
          fontSize: "1rem",
          lineHeight: 1.7,
          marginBottom: "16px",
        },
        caption: {
          fontSize: "0.75rem",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#3F51B5",
          transition: "color 0.2s ease-in-out",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "white",
          borderRadius: 2,
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        elevation3: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "100%",
            letterSpacing: "0%",

            "& fieldset": {
              borderColor: alpha("#000000", 0.23),
              borderWidth: "1px",
            },
          },

          "& .MuiOutlinedInput-input": {
            padding: "16px 14px",
            color: "#000000",
            fontSize: "16px",
            fontFamily: "Roboto",
            fontWeight: 400,
            lineHeight: "100%",
            letterSpacing: "0%",

            "&::placeholder": {
              color: alpha("#000000", 0.36),
              opacity: 1,
            },
          },

          "& .MuiInputLabel-root": {
            color: alpha("#000000", 0.36),
            fontSize: "16px",
            fontFamily: "Roboto",
            fontWeight: 400,
          },

          "& .MuiFormHelperText-root": {
            fontSize: "12px",
            fontFamily: "Roboto",
            fontWeight: 400,
            marginTop: "4px",

            "&.Mui-error": {
              color: "#d32f2f",
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          alignSelf: "flex-start",
          margin: 0,
          display: "flex",
          alignItems: "center",

          "& .MuiFormControlLabel-label": {
            color: "rgba(0, 0, 0, 0.87)",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "19px",
            letterSpacing: 0,
            marginTop: 0,
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
          },

          "& .MuiCheckbox-root": {
            width: "24px",
            height: "24px",
            padding: "0px",
            marginRight: "11px",
            dispaly: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& .MuiSvgIcon-root": {
              fontSize: "18px",
              display: "block",
            },
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: "24px 0",
          backgroundColor: "transparent",
          "& .MuiStepConnector-root": {
            top: "12px",
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
          },
          "& .MuiStepConnector-line": {
            borderColor: "#E0E0E0",
            borderTopWidth: "1px",
          },
          "& .MuiStep-root": {
            padding: "0 12px",
          },
          "& .MuiStepLabel-root": {
            flexDirection: "row",
            alignItems: "center",
          },
          "& .MuiStepLabel-label": {
            marginTop: "0px",
            marginLeft: "8px",
            fontSize: "14px",
            fontWeight: 400,
            color: alpha("#000000", 0.38),
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: alpha("#000000", 0.87),
            fontWeight: 400,
          },
          "& .MuiStepIcon-root": {
            width: "24px",
            height: "24px",
            color: "#E0E0E0",
            "& .MuiStepIcon-text": {
              fontSize: "12px",
              fontWeight: 500,
            },
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#3F51B5",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#4CAF50",
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          "& .MuiStepLabel-label": {
            fontSize: "0.875rem",
            fontWeight: 500,
            "&.Mui-active": {
              fontWeight: 600,
            },
            "&.Mui-completed": {
              fontWeight: 500,
            },
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: alpha("#000000", 0.38),
          "&.Mui-active": {
            color: "#3F51B5",
          },
          "&.Mui-completed": {
            color: "#3F51B5",
          },
        },
        text: {
          fontSize: "0.875rem",
          fontWeight: 600,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        alternativeLabel: {
          top: 19,
          left: "calc(-50% + 16px)",
          right: "calc(50% + 16px)",
        },
        line: {
          borderColor: alpha("#000000", 0.12),
          borderTopWidth: 2,
          borderRadius: 1,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: alpha("#000000", 0.54),
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.875rem",
          fontWeight: 400,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: "2px 8px",
          "&.Mui-selected": {
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#303F9F",
            },
            "& .MuiListItemIcon-root": {
              color: "#FFFFFF",
            },
          },
          "&:hover": {
            backgroundColor: alpha("#000000", 0.04),
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: "0.75rem",
          height: 18,
          minWidth: 18,
          borderRadius: 9,
        },
        colorError: {
          backgroundColor: "#F44336",
          color: "#FFFFFF",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "24px",
          },
          "& .MuiTableCell-body": {
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "24px",
          },
          "& .MuiTableRow-root": {
            "&:hover": {
              backgroundColor: alpha("#000000", 0.04),
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha("#000000", 0.08)}`,
          padding: "12px 8px",
        },
        head: {
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "24px",
          color: "rgba(0, 0, 0, 0.56)",
        },
        body: {
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "24px",
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
