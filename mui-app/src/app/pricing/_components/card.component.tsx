"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface PricingCardProps {
  title: string;
  price: number;
  period?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "contained" | "outlined";
  isPopular?: boolean;
}

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{ color: "rgba(0, 0, 0, 0.54)" }}
  >
    <path
      fill="currentColor"
      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
    />
  </svg>
);

export default function PricingCard({
  title,
  price,
  period = "/mo",
  features,
  buttonText,
  buttonVariant = "outlined",
  isPopular = false,
}: PricingCardProps) {
  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "grey.300",
        overflow: "visible",
        boxShadow: isPopular ? 3 : 1,
        borderRadius: "4px",
      }}
    >
      {isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 3,
          }}
        >
          <StarIcon />
        </Box>
      )}

      <Box
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.10);",
          py: isPopular ? 3 : 2,
          px: 3,
          textAlign: "center",
          borderBottom: "1px solid",
          borderBottomColor: "grey.300",
          height: isPopular ? "89px" : "62px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          color="text.primary"
          sx={{
            mt: isPopular ? 1 : 0,
            mb: 0,
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "30px",
          }}
        >
          {title}
        </Typography>

        {isPopular && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "30px",
              mt: -0.5,
            }}
          >
            Most popular
          </Typography>
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          px: 3,
          py: 3,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <Typography
              component="span"
              variant="h3"
              color="text.primary"
              sx={{
                fontSize: "48px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              $
            </Typography>
            <Typography
              component="span"
              variant="h3"
              color="text.primary"
              sx={{
                fontSize: "48px",
                fontWeight: "400",
                lineHeight: "30px",
              }}
            >
              {price}
            </Typography>
            <Typography
              component="span"
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "30px",
              }}
            >
              {period}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 3, flexGrow: 1 }}>
          {features.map((feature, index) => (
            <Typography key={index} variant="subtitle1" color="text.primary">
              {feature}
            </Typography>
          ))}
        </Stack>

        <Button
          variant={buttonVariant}
          color="primary"
          size="large"
          fullWidth
          sx={{
            py: 1,
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "18px",
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
