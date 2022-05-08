import React from "react";
import DarkModeSwitch from "../Switch/DarkModeSwitch";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

const UserDetailHeader: React.FC = () => {
  return (
    <header className="container flex items-center justify-between py-4 mx-auto mb-8">
      <Link href="/">
        <HomeIcon className="cursor-pointer" />
      </Link>
      <DarkModeSwitch />
    </header>
  );
};

export default UserDetailHeader;
