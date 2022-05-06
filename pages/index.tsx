import { Pagination, Tab, Tabs, TextField } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import UserCard from "../components/UserCard/UserCard";
import OCTOKIT from "../utils/octokit";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "../styles/Home.module.css";
import GithubUser from "../types/GithubUser";
import { DEFAULT_TAB } from "../utils/constants";

let debounceFunction: lodash.DebouncedFunc<() => void>;

const ITEMS_PER_PAGE = 12;
const DEFAULT_PAGE = 1;
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
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => fetchUsers(keyword, page), [keyword, page]);

  const fetchUsers = (_keyword: string, _page: number) => {
    if (!_keyword) {
      setTotal(0);
      setGithubUsers([]);
      setPage(DEFAULT_PAGE);
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
    <main className="flex flex-col w-full h-full">
      <div className={"" + (tab === 0 ? "" : " hidden ")}>
        <TextField
          className="w-full mb-4"
          id="outlined-basic"
          variant="outlined"
          type="search"
          placeholder="Enter GitHub username, i.e. gaearon"
          onChange={(e) => {
            debounceFunction?.cancel();
            debounceFunction = lodash.debounce(() => {
              setKeyword(e.target.value);
              setPage(DEFAULT_PAGE);
            }, DELAY);
            debounceFunction();
          }}
        />
        <div className="mb-4">{total} GitHub users found</div>
        <div
          className={
            "grid gap-2 grid-cols-2 mb-4 overflow-auto " +
            style["user-list-container"]
          }
        >
          {githubUsers.map((item, index) => (
            <UserCard
              key={"user-" + index}
              name={item.login}
              image={item.avatar_url}
            />
          ))}
        </div>
        <Pagination
          page={page}
          className={"flex justify-center mb-4" + (total > 0 ? "" : " hidden ")}
          count={Math.ceil(total / ITEMS_PER_PAGE)}
          shape="rounded"
          color="primary"
          onChange={(_, i) => i !== page && setPage(i)}
        />
      </div>
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
  );
};

export default Home;
