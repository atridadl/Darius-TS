import Elysia from "elysia";
import { html } from "@elysiajs/html";
import { homePage } from "./home";
import { hello } from "./api/hello";
import { decrementCount, getCount, incrementCount } from "./api/count";
import { swagger } from "@elysiajs/swagger";

import { Redis } from "ioredis";
const redis = new Redis(process.env.REDIS_URL!);
await redis.set("count", 0);

const apiRoutes = new Elysia()
  .use(html())
  .decorate("redis", redis)
  .get("/", homePage)
  .get("/api/htmx/hello", async () => hello, {
    detail: {
      tags: ["HTMX"],
    },
  })
  .post(
    "/api/htmx/count/incrementCount",
    async ({ redis }) => incrementCount(redis),
    {
      detail: {
        tags: ["HTMX"],
      },
    }
  )
  .post(
    "/api/htmx/count/decrementCount",
    async ({ redis }) => decrementCount(redis),
    {
      detail: {
        tags: ["HTMX"],
      },
    }
  )
  .get("/api/htmx/count/getCount", async ({ redis }) => await getCount(redis), {
    detail: {
      tags: ["HTMX"],
    },
  });

const pageRoutes = new Elysia().use(html()).get("/", homePage);

const websocketRoutes = new Elysia().ws("/ws", {
  open(ws) {
    ws.subscribe("broadcast");
  },
  message(ws, message) {
    ws.send(`<p hx-id="countfromserver" id="countfromserver">${message}</p>`);
    ws.publish(
      "broadcast",
      `<p hx-id="countfromserver" id="countfromserver">${message}</p>`
    );
  },
});

// This is the main router that will be used in src/main.ts
export const appRouter = new Elysia()
  .use(
    swagger({
      exclude: pageRoutes.routes.map((route) => route.path),
      documentation: {
        info: {
          title: "Darius API",
          description: "API Documentation for Darius",
          version: "1.0.0",
        },
        tags: [
          {
            name: "HTMX",
            description: "HTMX Endpoints - These return HTML",
          },
        ],
      },
    })
  )
  .use(apiRoutes)
  .use(pageRoutes)
  .use(websocketRoutes);
