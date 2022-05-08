import React from "react";
import { Container } from "@mui/material";
import UserDetailHeader from "./UserDetailHeader";

type LayoutProps = {
  children: React.ReactNode;
};

const UserDetailLayout = ({ children }: LayoutProps) => {
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
      <UserDetailHeader />
      {children}
    </Container>
  );
};

export default UserDetailLayout;
