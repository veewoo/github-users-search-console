import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GithubUser from "../../types/GithubUser";
import OCTOKIT from "../../utils/octokit";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { DEFAULT_TAB } from "../../utils/constants";

const UserDetail: NextPage = () => {
  const [user, setUser] = useState<GithubUser>();
  const router = useRouter();
  const [tab, setTab] = useState(DEFAULT_TAB);

  useEffect(() => {
    const { username } = router.query;
    if (!username) return;

    OCTOKIT.request(`GET /users/${username}`).then((res) => {
      console.log(res.data);

      if (typeof res.data === "object") {
        setUser(Object.assign(user || {}, res.data as GithubUser));
      }
    });
  }, []);
  return (
    <main className="flex flex-col items-center w-full h-full">
      <Avatar
        alt="Avatar"
        src={user?.avatar_url}
        sx={{ width: 160, height: 160 }}
        className="mb-4"
      />
      <Typography variant="h5">
        <b>{user?.name}</b>
      </Typography>
      <Typography variant="h5">{user?.login}</Typography>
      <Typography variant="body2" className="inline-flex items-end">
        <CorporateFareIcon className="mr-2" />
        {user?.location}
      </Typography>
      <Tabs
        value={tab}
        className="w-full"
        onChange={(_, i) => i !== tab && setTab(i)}
        aria-label="icon label tabs example"
      >
        <Tab
          className="w-4/12"
          label={
            <span>
              Repositories
              <br />({user?.public_repos})
            </span>
          }
        />
        <Tab
          className="w-4/12"
          label={
            <span>
              Followers
              <br />({user?.followers})
            </span>
          }
        />
        <Tab
          className="w-4/12"
          label={
            <span>
              Followings
              <br />({user?.following})
            </span>
          }
        />
      </Tabs>
    </main>
  );
};

export default UserDetail;
