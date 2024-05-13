import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";

export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  owner: varchar("owner", { length: 100 }).notNull(),
});

export const contributors = pgTable("contributors", {
  id: serial("id").primaryKey(),
  github: varchar("github", { length: 25 }).notNull().unique(),
  wallet: text("wallet").notNull().unique(),
  score: integer("score").default(0),

});

export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  contributor_id: integer("contributor_id").notNull().references(() => contributors.id),
  repository_id: integer("repository_id").notNull().references(() => repositories.id),
  issues_created: integer("issues_created").default(0),
  issues_commented: integer("issues_commented").default(0),
  issues_closed: integer("issues_closed").default(0),
  score: integer("score").default(0),
});

export type Contributor = typeof contributors.$inferSelect;
export type Repository = typeof repositories.$inferSelect;
export type Contribution = typeof contributions.$inferSelect;