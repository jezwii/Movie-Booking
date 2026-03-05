"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MovieIcon from "@mui/icons-material/Movie";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {auth} from "@/app/firebase/config";
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import {provider} from "@/app/firebase/googleProvider";


export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setError(null);
      try {
        const cred = await signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          router.push("/");
        }) ;
        resetForm();
      } catch {
        setError("Sign-in failed. Please check your credentials.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // TODO: Replace with Firebase signInWithPopup(auth, googleProvider)
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const cred = await signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        router.push("/");
      }) ;
    } catch {
      setError("Google sign-in failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
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
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your account to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              required
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 1 }}
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box sx={{ textAlign: "right", mb: 3 }}>
              <MuiLink
                href="#"
                variant="body2"
                color="primary"
                underline="hover"
              >
                Forgot password?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={formik.isSubmitting}
              sx={{ mb: 2, py: 1.5 }}
            >
              {formik.isSubmitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>

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
            onClick={handleGoogleSignIn}
            sx={{ mb: 3, py: 1.5 }}
          >
            Continue with Google
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don&apos;t have an account?{" "}
            <MuiLink
              href="/sign-up"
              color="primary"
              underline="hover"
              fontWeight={600}
            >
              Sign up
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
