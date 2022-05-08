import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GithubUser from "../../types/GithubUser";
import OCTOKIT from "../../utils/octokit";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import {
  DEFAULT_PAGE,
  DEFAULT_TAB,
  ITEMS_PER_PAGE,
} from "../../utils/constants";
import UserDetailLayout from "../../components/Layout/UserDetailLayout";
import TabPanel from "../../components/Tab/TabPanel";
import { type } from "os";
import RepositoryCard from "../../components/Card/RepositoryCard";
import style from "../../styles/User.module.css";
import Pagination from "../../components/Pagination/Pagination";
import UserCard from "../../components/Card/UserCard";

let username = "";

type GithubRepository = {
  name: string;
  stargazers_count: number;
  forks_count: number;
};

const UserDetail: NextPage = () => {
  const [user, setUser] = useState<GithubUser>();
  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [followerUsers, setFollowerUsers] = useState<GithubUser[]>([]);
  const [followingUsers, setFollowingUsers] = useState<GithubUser[]>([]);
  const router = useRouter();
  const [tab, setTab] = useState(DEFAULT_TAB);

  useEffect(() => {
    if (!router.query.username) return;
    username = router.query.username as string;

    OCTOKIT.request(`GET /users/${username}`).then((res) => {
      console.log(res.data);

      if (typeof res.data === "object") {
        setUser(Object.assign(user || {}, res.data as GithubUser));
      }
    });
  }, [router.query]);

  useEffect(() => {
    fetchData("repos", DEFAULT_PAGE);
    fetchData("followers", DEFAULT_PAGE);
    fetchData("following", DEFAULT_PAGE);
  }, [user]);

  const fetchData = async (
    type: "repos" | "followers" | "following",
    page: number
  ) => {
    if (!username) return;

    // const path = type === "following" ? type + "{/other_user}" : type;
    // console.log(type, path);

    const res = await OCTOKIT.request(
      `GET /users/${username}/${type}?per_page=${ITEMS_PER_PAGE}&page=${page}`
    );

    if (!Array.isArray(res.data)) return;

    switch (type) {
      case "repos":
        setRepositories(res.data as GithubRepository[]);
        break;

      case "followers":
        setFollowerUsers(res.data as GithubUser[]);
        break;

      case "following":
        setFollowingUsers(res.data as GithubUser[]);
        break;

      default:
        break;
    }
  };

  return (
    <UserDetailLayout>
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
        <Typography className="inline-flex items-end mb-4" variant="body2">
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
        <div className={`w-full`}>
          <TabPanel index={0} value={tab}>
            <div
              className={`grid gap-2 grid-cols-2 py-4 mb-4 overflow-auto ${style["repo-list-container"]}`}
            >
              {repositories.map((item, index) => (
                <RepositoryCard
                  key={"repo-" + index}
                  name={item.name}
                  forks={item.forks_count}
                  stars={item.stargazers_count}
                />
              ))}
            </div>
            <Pagination
              total={user?.public_repos || 0}
              onPageSelect={(index) => {
                fetchData("repos", index);
              }}
            />
          </TabPanel>
          <TabPanel index={1} value={tab}>
            <div
              className={`grid gap-2 grid-cols-2 py-4 mb-4 overflow-auto ${style["repo-list-container"]}`}
            >
              {followerUsers.map((item, index) => (
                <UserCard
                  key={"follower-" + index}
                  name={item.login}
                  image={item.avatar_url}
                />
              ))}
            </div>
            <Pagination
              total={user?.followers || 0}
              onPageSelect={(index) => {
                fetchData("followers", index);
              }}
            />
          </TabPanel>
          <TabPanel index={2} value={tab}>
            <div
              className={`grid gap-2 grid-cols-2 py-4 mb-4 overflow-auto ${style["repo-list-container"]}`}
            >
              {followingUsers.map((item, index) => (
                <UserCard
                  key={"following-" + index}
                  name={item.login}
                  image={item.avatar_url}
                />
              ))}
            </div>
            <Pagination
              total={user?.following || 0}
              onPageSelect={(index) => {
                fetchData("following", index);
              }}
            />
          </TabPanel>
        </div>
      </main>
    </UserDetailLayout>
  );
};

export default UserDetail;
