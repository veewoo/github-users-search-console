import { useRouter } from "next/router";
import React from "react";
import { Switch } from "@mui/material";

type Props = {
  onSwitchChange: (checked: boolean) => void;
};

const Header: React.FC<Props> = ({ onSwitchChange }) => {
  return (
    <header className="container flex items-center justify-between py-4 mx-auto mb-8">
      <h2 className="text-3xl">Search</h2>
      <Switch
        defaultChecked
        onChange={(e) => {
          onSwitchChange(e.target.checked);
        }}
      />
    </header>
  );
};

export default React.memo(Header);
