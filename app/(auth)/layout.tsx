"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import pageTheme from "@/app/theme/theme";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={pageTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}
