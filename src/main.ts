import { Elysia } from "elysia";
import { appRouter } from "./routes/router";
import { staticPlugin } from "@elysiajs/static";

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
  .use(appRouter)
  .listen(3000);

console.log(
  `✨ Darius is running at ${app.server?.hostname}:${app.server?.port} ✨`
);
