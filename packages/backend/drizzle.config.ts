import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    port: 5432,
    database: "contributor_hub",
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
  },
} satisfies Config;
