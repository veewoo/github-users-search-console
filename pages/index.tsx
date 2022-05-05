import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ColorModeContext } from "../components/Layout/Layout";
import _ from "lodash";
import axios from "axios";

let debounceFunction: _.DebouncedFunc<() => void>;

type GithubUser = {
  login: string;
  avatar_url: string;
  followers_url: string;
  following_url: string;
};

const Home: NextPage = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
  const [total, setTotal] = useState(0);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounceFunction?.cancel();
    debounceFunction = _.debounce(() => {
      console.log(e.target.value);
      axios
        .get("https://api.github.com/search/users?q=" + e.target.value)
        .then((res) => {
          if (res.data?.total_count) setTotal(res.data.total_count);
          if (Array.isArray(res.data?.items)) {
            setGithubUsers(
              res.data.items.map((item: any) => ({
                login: item["login"] || "",
                avatar_url: item["avatar_url"] || "",
                followers_url: item["followers_url"] || "",
                following_url: item["following_url"] || "",
              }))
            );
          }
        });
    }, 1000);

    debounceFunction();
  };

  useEffect(() => {
    console.log(githubUsers);
  }, [githubUsers]);

  return (
    <main>
      <TextField
        className="w-full"
        id="outlined-basic"
        variant="outlined"
        type="search"
        placeholder="Enter GitHub username, i.e. gaearon"
        onChange={(e) => {
          if (e) handleSearchChange(e);
        }}
      />
      <div>{total} GitHub users found</div>
      <div className="flex flex-wrap">
        {githubUsers.map((item) => (
          <Card className="w-6/12">
            <CardMedia
              component="img"
              width="64"
              height="64"
              image={item.avatar_url}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;
