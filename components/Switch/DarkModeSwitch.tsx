import { Switch } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../utils/contexts";

const DarkModeSwitch = () => {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Switch
      onChange={(e) => {
        colorMode.toggleColorMode();
      }}
    />
  );
};

export default React.memo(DarkModeSwitch);
