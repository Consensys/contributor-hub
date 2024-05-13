import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { admin } from "./controllers/admin";
import { client } from "./controllers/client";
import { webhook } from "./controllers/webhook";


const app = new Elysia()
  .use(webhook)
  .use(webhook)
  .group("admin", (app) => app.use(admin))
  .group("client", (app) => app.use(client))
  .get("/health", () => "Hello Elysia")
  .use(swagger())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
