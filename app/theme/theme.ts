import { createTheme } from "@mui/material/styles";

const pageTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E91E63",
      contrastText: "#ffffff",
    },
    background: {
      default: "#120C10",
      paper: "#1D161B",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default pageTheme;
