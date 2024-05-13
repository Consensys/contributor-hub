
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    database: "contributors",
    user: "postgres",
    password: "postgres",
  }
} satisfies Config;