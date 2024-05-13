import { Octokit } from "octokit";

export  function githubAdapter() {
    return new Octokit({
        auth: process.env.GITHUB_TOKEN,
      })
}
