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
import { createUserWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import {provider} from "@/app/firebase/googleProvider";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setError(null);
      try {

        const cred = await createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);

        });

        // await updateProfile(cred.user, { displayName: values.name });
        console.log("Sign up with:", values.name, values.email);
        router.push("/");
        resetForm();
      } catch {
        setError("Could not create account. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // TODO: Replace with Firebase signInWithPopup(auth, googleProvider)
  const handleGoogleSignUp = async () => {
    setError(null);
    try {
        const cred = await signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        router.push("/");
      }) ;
    } catch {
      setError("Google sign-up failed.");
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
            Create an account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sign up to start booking your favourite movies
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Full name"
              type="text"
              fullWidth
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2 }}
              autoComplete="name"
            />
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
              helperText={
                (formik.touched.password && formik.errors.password) ||
                "Minimum 6 characters"
              }
              sx={{ mb: 2 }}
              autoComplete="new-password"
              
            />
            <TextField
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              fullWidth
              required
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              sx={{ mb: 3 }}
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={formik.isSubmitting}
              sx={{ mb: 2, py: 1.5 }}
            >
              {formik.isSubmitting ? "Creating account…" : "Create Account"}
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
            onClick={handleGoogleSignUp}
            sx={{ mb: 3, py: 1.5 }}
          >
            Continue with Google
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <MuiLink
              href="/sign-in"
              color="primary"
              underline="hover"
              fontWeight={600}
            >
              Sign in
            </MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
