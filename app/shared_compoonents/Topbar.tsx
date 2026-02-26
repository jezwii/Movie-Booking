"use client";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6">Explore Movies</Typography>
      </Toolbar>
    </AppBar>
  );
}
