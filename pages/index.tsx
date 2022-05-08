import { Tab, Tabs, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import UserCard from "../components/Card/UserCard";
import OCTOKIT from "../utils/octokit";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "../styles/Home.module.css";
import GithubUser from "../types/GithubUser";
import { DEFAULT_PAGE, DEFAULT_TAB, ITEMS_PER_PAGE } from "../utils/constants";
import HomeLayout from "../components/Layout/HomeLayout";
import TabPanel from "../components/Tab/TabPanel";
import Pagination from "../components/Pagination/Pagination";
import GithubText2 from "../assets/images/GitHub_Logo.svg";
import GithubLogo from "../assets/images/GitHub-Mark-120px-plus.svg";

let debounceFunction: lodash.DebouncedFunc<() => void>;

const DELAY = 1000;

const tabs = [
  {
    name: "Search",
    icon: <SearchIcon />,
  },
  {
    name: "Favorite",
    icon: <FavoriteIcon />,
  },
];

const Home: NextPage = () => {
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
  const [tab, setTab] = useState(DEFAULT_TAB);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => fetchUsers(keyword, DEFAULT_PAGE), [keyword]);

  const fetchUsers = (_keyword: string, _page: number) => {
    if (!_keyword) {
      setTotal(0);
      setGithubUsers([]);
      return;
    }

    OCTOKIT.request(
      `GET /search/users?q=${encodeURIComponent(
        _keyword
      )}&per_page=${ITEMS_PER_PAGE}&page=${_page}`
    ).then((res) => {
      if (res.data?.total_count) setTotal(res.data.total_count);
      if (!Array.isArray(res.data?.items)) return;
      setGithubUsers(
        res.data.items.map((item: any) => ({
          login: item.login || "",
          avatar_url: item.avatar_url || "",
        }))
      );
    });
  };

  return (
    <HomeLayout>
      <main className="flex flex-col w-full h-full">
        <TabPanel className="flex flex-col h-full" index={0} value={tab}>
          <TextField
            className="w-full mb-4"
            id="outlined-basic"
            variant="outlined"
            type="search"
            placeholder="Enter GitHub username, i.e. gaearon"
            onChange={(e) => {
              debounceFunction?.cancel();
              debounceFunction = lodash.debounce(
                () => setKeyword(e.target.value),
                DELAY
              );
              debounceFunction();
            }}
          />
          <div
            className={`flex flex-col items-center justify-center w-full h-full ${
              githubUsers.length ? "hidden" : ""
            }`}
          >
            <img src={GithubLogo.src} />
            <img src={GithubText2.src} />
            <Typography className="w-3/4 text-center" variant="body1">
              Enter GitHub username and search users matching the input like
              Google Search, click avatars to view more details, including
              repositories, followers and following.
            </Typography>
          </div>
          <div className={githubUsers.length ? "" : "hidden"}>
            <div className="">{total} GitHub users found</div>
            <div
              className={`grid gap-2 grid-cols-2 mb-4 overflow-auto py-4 ${style["user-list-container"]}`}
            >
              {githubUsers.map((item, index) => (
                <UserCard
                  key={"user-" + index}
                  name={item.login}
                  image={item.avatar_url}
                />
              ))}
            </div>
          </div>
          <Pagination
            total={total}
            onPageSelect={(index) => fetchUsers(keyword, index)}
          />
        </TabPanel>
        <Tabs
          value={tab}
          className="mt-auto border-t-2"
          onChange={(_, i) => i !== tab && setTab(i)}
          aria-label="icon label tabs example"
        >
          {tabs.map((item, index) => (
            <Tab
              key={"tab-" + index}
              className="w-6/12"
              icon={item.icon}
              label={item.name}
            />
          ))}
        </Tabs>
      </main>
    </HomeLayout>
  );
};

export default Home;
