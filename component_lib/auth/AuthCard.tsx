"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import GoogleIcon from "@mui/icons-material/Google";

interface AuthCardProps {
  title: string;
  subtitle: string;
  error: string | null;
  onGoogleClick: () => void;
  googleLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  error,
  onGoogleClick,
  googleLabel,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children,
}: AuthCardProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 440, bgcolor: "background.paper" }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
            <MovieIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h6" fontWeight={700} color="primary">
              BookMovies
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form fields injected here */}
          {children}

          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<GoogleIcon />}
            onClick={onGoogleClick}
            sx={{ mb: 3, py: 1.5 }}
          >
            {googleLabel}
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            {footerText}{" "}
            <MuiLink
              href={footerLinkHref}
              color="primary"
              underline="hover"
              fontWeight={600}
            >
              {footerLinkLabel}
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
