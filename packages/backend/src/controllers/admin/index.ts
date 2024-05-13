import Elysia, { t } from "elysia";
import { db } from "../../database";
import { repositories } from "../../database/schema";
import { githubAdapter } from "../../adaptors/github/githubAdapter";

export const admin = new Elysia();

admin.get("/repos", async () => {
  const resp = await githubAdapter().request("GET /orgs/{org}/repos", {
    org: "rad-contributor-hub",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return resp.data.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks,
    issues: repo.open_issues,
    visibility: repo.private ? "private" : "public",
  }));
});

admin.post(
  "/repos/whitelist/:owner/:repo",
  async ({ params: { owner, repo } }) => {
    const resp = await githubAdapter().request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    db.insert(repositories)
      .values({
        name: resp.data.name,
        owner: resp.data.owner.login,
      })
      .execute();
  },
  {
    body: t.Object({
      name: t.String(),
      owner: t.String(),
    }),
  }
);
