import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";

type Props = {
  name: string;
  image: string;
  followersUrl: string;
  followingsUrl: string;
};

const UserCard: React.FC<Props> = ({
  name,
  image,
  followersUrl,
  followingsUrl,
}) => {
  const [followers, setFollowers] = useState<number>(-1);
  const [followings, setFollowings] = useState<number>(-1);

  // useEffect(() => {
  //   axios.get(followersUrl).then((res) => {
  //     console.log("followers", res);
  //   });
  // }, [followersUrl]);

  return (
    <Card className="flex w-6/12 p-2">
      <div
        className="w-16 h-16 mr-2"
        style={{
          width: 64,
          height: 64,
          backgroundImage: `url("${image}")`,
        }}
      ></div>
      <CardContent className="p-0">
        <Typography gutterBottom variant="body1">
          <b>{name}</b>
        </Typography>
        {followers > -1 && (
          <Typography variant="body2">followers: {followers}</Typography>
        )}
        {followings > -1 && (
          <Typography variant="body2">followings: {followings}</Typography>
        )}
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default UserCard;
