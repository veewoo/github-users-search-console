import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import OCTOKIT from "../../utils/octokit";
import style from "../../styles/Card.module.css";
import { useRouter } from "next/router";

type Props = {
  name: string;
  image: string;
};

const UserCard: React.FC<Props> = ({ name, image }) => {
  const router = useRouter();

  const [followers, setFollowers] = useState<number>(-1);
  const [followings, setFollowings] = useState<number>(-1);

  useEffect(() => {
    setFollowers(-1);
    setFollowings(-1);

    OCTOKIT.request(`GET /users/${name}`).then((res) => {
      if (typeof res.data?.followers === "number") {
        setFollowers(res.data.followers);
      }
      if (typeof res.data?.following === "number") {
        setFollowings(res.data.following);
      }
    });
  }, [name]);

  return (
    <Card
      className={"flex p-2 cursor-pointer " + style.container}
      onClick={() => router.push("/users/" + name)}
    >
      <div
        className="w-16 h-16 mr-2 bg-contain"
        style={{
          width: 64,
          height: 64,
          backgroundImage: `url("${image}")`,
        }}
      ></div>
      <CardContent className="p-0">
        <Typography
          className={
            "whitespace-nowrap overflow-hidden text-ellipsis " + style.name
          }
          gutterBottom
          variant="body1"
        >
          <b>{name}</b>
        </Typography>
        {followers > -1 && (
          <Typography variant="body2">followers: {followers}</Typography>
        )}
        {followings > -1 && (
          <Typography variant="body2">followings: {followings}</Typography>
        )}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default UserCard;
