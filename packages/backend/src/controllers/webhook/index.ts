import Elysia, { t } from "elysia";
import { db } from "../../database";
import {
  contributions,
  contributors,
  repositories,
} from "../../database/schema";
import { eq } from "drizzle-orm";

export const webhook = new Elysia();

const scoreWeights = {
  issues_closed: 5,
  issues_created: 1,
}

webhook.post(
  "/webhook",
  async ({ body, headers }: { body: any; headers: any }) => {
    const eventType = headers["x-github-event"];

    console.log("====", body);

    if (eventType === "issues") {
      if (body.action === "closed") {
        const contributor = await db
          .select()
          .from(contributors)
          .where(eq(contributors.github, body.issue.assignee.login))
          .execute();
        const repository = await db
          .select()
          .from(repositories)
          .where(eq(repositories.name, body.repository.name))
          .execute();
        if (contributor.length === 0) {
          console.log("Contributor not found");
        }
        await db
          .insert(contributions)
          .values({
            contributor_id: contributor[0].id,
            repository_id: repository[0].id,
            issues_closed: 1 * scoreWeights.issues_closed,
          })
          .execute();
      }

      if (body.action === "opened") {
        const contributor = await db
          .select()
          .from(contributors)
          .where(eq(contributors.github, body.issue.user.login))
          .execute();
        const repository = await db
          .select()
          .from(repositories)
          .where(eq(repositories.name, body.repository.name))
          .execute();

        if (contributor.length === 0) {
          console.log("Contributor not found");
        }

        if (repository.length === 0) {
          console.log("Repository not found");
        }

        await db
          .insert(contributions)
          .values({
            contributor_id: contributor[0].id,
            repository_id: repository[0].id,
            issues_created: 1 * scoreWeights.issues_created,
          })
          .execute();
      }
    }
  }
);
