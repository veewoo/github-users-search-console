import React from "react";
import Header from "./Header";
import HomeFooter from "./HomeFooter";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <Container
      maxWidth="sm"
      className="flex flex-col w-full h-screen py-0 overflow-auto"
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
      <Header />
      {children}
      <HomeFooter />
    </Container>
  );
};

export default HomeLayout;
