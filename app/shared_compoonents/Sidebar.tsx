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
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const drawerWidth = 240;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Bookings", icon: <BookIcon />, path: "/booking-details" },
  ];

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6">BookMovies</Typography>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
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
