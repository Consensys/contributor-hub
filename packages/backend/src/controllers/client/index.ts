import Elysia, { t } from "elysia";
import { db } from "../../database";
import {
  contributions as contributionsSchema,
  contributors,
  repositories,
} from "../../database/schema";
import { eq } from "drizzle-orm";
import { githubAdapter } from "../../adaptors/github/githubAdapter";

export const client = new Elysia();

client.post(
  "/register",
  async ({ body }) => {
    const { wallet, github} = body;
    await db.insert(contributors).values({ wallet, github}).execute();
  },
  {
    body: t.Object({
      github: t.String(),
      wallet: t.String(),
    }),
  }
);

client.get("/repos", async () => {
  return await db.select().from(repositories).execute();
});

client.get("/repos/:id", async ({ params: { id } }) => {
  const repo = await db
    .select()
    .from(repositories)
    .where(eq(repositories.id, Number(id)))
    .execute();

  if (repo.length === 0) {
    return null;
  }

  const { owner, name } = repo[0];

  const resp = await githubAdapter().request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: name,
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

client.get("/score/:id", async ({ params: { id } }) => {
  const contributions = await db
    .select()
    .from(contributionsSchema)
    .where(eq(contributionsSchema.contributor_id, Number(id)))
    .execute();

  if (contributions.length === 0) {
    return null;
  }

  return contributions.reduce((acc, curr) => {
    return (
      acc +
      (curr.issues_closed ?? 0) +
      (curr.issues_created ?? 0) +
      (curr.issues_commented ?? 0)
    );
  }, 0);
});
