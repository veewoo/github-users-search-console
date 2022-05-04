import { useRouter } from "next/router";
import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Switch } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const router = useRouter();

  return (
    <header className="container flex items-center justify-between py-4 mx-auto mb-8">
      <h2 className="text-3xl">Search</h2>
      <Switch
        defaultChecked
        onChange={(e) => {
          console.log(e.target.checked);
        }}
      />
    </header>
  );
};

export default React.memo(Header);
