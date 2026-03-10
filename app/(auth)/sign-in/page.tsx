"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/core_componets/hooks/useAuth";
import AuthCard from "@/component_lib/auth/AuthCard";

export default function SignInPage() {
  const { error, signInWithEmail, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await signInWithEmail(values.email, values.password);
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      error={error}
      onGoogleClick={signInWithGoogle}
      googleLabel="Continue with Google"
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/sign-up"
    >
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
          <MuiLink href="#" variant="body2" color="primary" underline="hover">
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
    </AuthCard>
  );
}
