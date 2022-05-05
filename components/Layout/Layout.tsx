import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleSwitchChange = (checked: boolean) => {
    setMode(checked ? "dark" : "light");
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box
            className="block w-full h-full overflow-auto"
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
              p: 3,
            }}
          >
            <div className="container flex flex-col h-full mx-auto">
              <Header onSwitchChange={handleSwitchChange} />
              {children}
              <Footer />
            </div>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default Layout;
