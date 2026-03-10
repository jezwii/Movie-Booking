"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, CssBaseline, Box, Toolbar } from "@mui/material";
import pageTheme from "@/theme/theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ResponsiveDrawer from "../component_lib/shared_components/ResponsiveDrawer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { usePathname } from "next/navigation";
import AuthProvider from "@/app/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pages that should NOT show the Sidebar/Topbar
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <Provider store={store}>
            <ThemeProvider theme={pageTheme}>
              <CssBaseline />
              <AuthProvider>
                {isAuthPage ? (
                  children
                ) : (
                  <Box sx={{ display: "flex", height: "100vh" }}>
                    <ResponsiveDrawer />
                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        width: { sm: `calc(100% - 240px)` },
                      }}
                    >
                      <Toolbar /> {/* Spacer for fixed AppBar */}
                      <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
                    </Box>
                  </Box>
                )}
              </AuthProvider>
            </ThemeProvider>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
