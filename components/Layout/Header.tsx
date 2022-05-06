import React from "react";
import DarkModeSwitch from "../Switch/DarkModeSwitch";

const Header: React.FC = () => {
  return (
    <header className="container flex items-center justify-between py-4 mx-auto mb-8">
      <h2 className="text-3xl">Search</h2>
      <DarkModeSwitch />
    </header>
  );
};

export default Header;
