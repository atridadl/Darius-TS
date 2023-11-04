import Elysia from "elysia";
import { html } from "@elysiajs/html";
import Redis from "ioredis";

import { decrementCount, getCount, incrementCount } from "./count";
import { hello } from "./hello";

const redis = new Redis(process.env.REDIS_URL!);
await redis.set("count", 0);

export const apiRoutes = new Elysia()
  .use(html())
  .decorate("redis", redis)
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

export const websocketRoutes = new Elysia().ws("/ws", {
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