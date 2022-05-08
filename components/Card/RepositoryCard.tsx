import React, { useEffect, useState } from "react";
import { CardContent, Typography } from "@mui/material";
import OCTOKIT from "../../utils/octokit";
import style from "../../styles/Card.module.css";
import { useRouter } from "next/router";
import Card from "./Card";

type Props = {
  name: string;
  stars: number;
  forks: number;
};

const RepositoryCard: React.FC<Props> = ({ name, stars, forks }) => {
  return (
    <Card name={name}>
      {stars > 0 && <Typography variant="body2">stars: {stars}</Typography>}
      {forks > 0 && <Typography variant="body2">forks: {forks}</Typography>}
    </Card>
  );
};

export default RepositoryCard;
