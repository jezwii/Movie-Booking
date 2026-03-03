"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import pageTheme from "@/app/theme/theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Sidebar from "./shared_compoonents/Sidebar";
import Topbar from "./shared_compoonents/Topbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <Provider store={store}>
            <ThemeProvider theme={pageTheme}>
              <CssBaseline />
              <Box sx={{ display: "flex", height: "100vh" }}>
                <Box>
                  <Sidebar />
                </Box>
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
                  <Box sx={{ height: 64 }}>
                    <Topbar />
                  </Box>
                  <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
                </Box>
              </Box>
            </ThemeProvider>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
