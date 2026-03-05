"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearUser } from "@/app/store/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const drawerWidth = 240;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    router.push("/sign-in");
  };

  const mainMenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Bookings", icon: <BookIcon />, path: "/booking-details" },
  ];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar>
        <Typography variant="h6">BookMovies</Typography>
      </Toolbar>

      <List>
        {mainMenuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={pathname === item.path}
            onClick={() => {
              router.push(item.path);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      {/* Push auth action to the bottom */}
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        {user ? (
          <ListItemButton
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton
            selected={pathname === "/sign-in"}
            onClick={() => {
              router.push("/sign-in");
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* mobile drawer */}
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleToggle}
          sx={{ display: { xs: "block", md: "none" }, ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* desktop drawer */}
      <Drawer
        variant="permanent"
        open
        onClose={handleToggle}
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
