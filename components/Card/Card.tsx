import React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import style from "../../styles/Card.module.css";

type Props = {
  name: string;
  children: React.ReactNode;
  image?: string;
  onClick?: () => void;
};

const Card: React.FC<Props> = ({ name, image, onClick, children }) => {
  return (
    <MuiCard
      className={"flex p-2 cursor-pointer " + style.container}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick();
        }
      }}
    >
      {image && (
        <div
          className="w-16 h-16 mr-2 bg-contain"
          style={{
            width: 64,
            height: 64,
            backgroundImage: `url("${image}")`,
          }}
        ></div>
      )}
      <CardContent className="flex-1 overflow-hidden p-0">
        <Typography
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          variant="body1"
        >
          <b>{name}</b>
        </Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
