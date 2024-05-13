import Elysia from "elysia";
import { githubAdapter } from "../../adaptors/github/githubAdapter";

export const repo = new Elysia();

repo.get("repo/:owner/:repo", async ({ params: { owner, repo } }) => {
  const resp = await githubAdapter().request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return {
    id: resp.data.id,
    owner: resp.data.owner.login,
    name: resp.data.name,
    description: resp.data.description,
    url: resp.data.html_url,
    stars: resp.data.stargazers_count,
    forks: resp.data.forks,
    issues: resp.data.open_issues,
    visibility: resp.data.private ? "private" : "public",
  };
});

// repo.get("contributors/:owner/:repo", async ({ params: { owner, repo } }) => {
//   const resp = await githubAdapter().request(
//     "GET /repos/{owner}/{repo}/contributors",
//     {
//       owner: owner,
//       repo: repo,
//       headers: {
//         "X-GitHub-Api-Version": "2022-11-28",
//       },
//     }
//   );

//   return resp.data.map((contributor: any) => ({
//     id: contributor.id,
//     login: contributor.login,
//     avatar_url: contributor.avatar_url,
//     url: contributor.html_url,
//     contributions: contributor.contributions,
//   }));
// });

repo.get("events/:owner/:repo", async ({ params: { owner, repo } }) => {
  const resp = await githubAdapter().request(
    "GET /repos/{owner}/{repo}/events",
    {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return resp.data.map((event: any) => ({
    id: event.id,
    type: event.type,
    actor: event.actor.login,
    created_at: event.created_at,
    payload: event.payload,
  }));
});
