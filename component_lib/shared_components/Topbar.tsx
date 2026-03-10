"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearUser } from "@/app/store/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Topbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    router.push("/sign-in");
  };

  // Derive initials for avatar when no photo is available
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0]?.toUpperCase() ?? "?");

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <SearchBar />
            {/* User avatar */}
            <Tooltip title={user.displayName ?? user.email ?? ""}>
              <Avatar
                src={user.photoURL ?? undefined}
                sx={{ width: 34, height: 34, fontSize: 14, cursor: "default" }}
              >
                {!user.photoURL && initials}
              </Avatar>
            </Tooltip>

            {/* Display name or email */}
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {user.displayName ?? user.email}
            </Typography>

            {/* Logout icon button */}
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout} size="small">
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
