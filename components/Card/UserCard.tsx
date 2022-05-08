import React, { useEffect, useState } from "react";
import { CardContent, Typography } from "@mui/material";
import OCTOKIT from "../../utils/octokit";
import style from "../../styles/Card.module.css";
import { useRouter } from "next/router";
import Card from "./Card";

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

    if (!name) return;

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
      name={name}
      image={image}
      onClick={() => router.push("/users/" + name)}
    >
      {followers > -1 && (
        <Typography variant="body2">followers: {followers}</Typography>
      )}
      {followings > -1 && (
        <Typography variant="body2">followings: {followings}</Typography>
      )}
    </Card>
  );
};

export default UserCard;
