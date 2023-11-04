import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import swagger from "@elysiajs/swagger";

import { pageRoutes } from "./pages";
import { apiRoutes, websocketRoutes } from "./api";

const app = new Elysia()
  .use(
    staticPlugin({
      assets: "public/js",
      prefix: "public/js",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    })
  )
  .use(
    staticPlugin({
      assets: "public/img",
      prefix: "public/img",
      headers: {
        "Cache-Control": "max-age=604800",
      },
    })
  )
  .use(
    staticPlugin({
      assets: "public/css",
      prefix: "public/css",
    })
  )
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
  .use(websocketRoutes)
  .listen(3000);

console.log(
  `✨ Darius is running at ${app.server?.hostname}:${app.server?.port} ✨`
);
