type GithubUser = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
  public_repos: number;
  repos_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
};

export default GithubUser;
