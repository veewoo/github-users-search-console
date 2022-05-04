import { Box, IconButton, useTheme } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { ColorModeContext } from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <main>
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <span>dark</span> : <span>light</span>}
      </IconButton>
    </main>
  );
};

export default Home;
