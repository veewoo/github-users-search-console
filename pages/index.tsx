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
import UserCard from "../components/UserCard/UserCard";

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
    <main className="">
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
      <div className="flex flex-wrap overflow-y-auto">
        {githubUsers.map((item) => (
          <UserCard
            name={item.login}
            image={item.avatar_url}
            followersUrl={item.followers_url}
            followingsUrl={item.following_url}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
