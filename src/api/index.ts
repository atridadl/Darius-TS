import Elysia from "elysia";
import { html } from "@elysiajs/html";

import { decrementCount, getCount, incrementCount } from "./count";
import { hello } from "./hello";

export const apiRoutes = new Elysia().use(html()).group("/api", (api) =>
  api.group("/htmx", (htmx) =>
    htmx
      .get("/hello", async () => hello, {
        detail: {
          tags: ["HTMX"],
        },
      })
      .post("/count/incrementCount", incrementCount, {
        detail: {
          tags: ["HTMX"],
        },
      })
      .post("/count/decrementCount", decrementCount, {
        detail: {
          tags: ["HTMX"],
        },
      })
      .get("/count/getCount", getCount, {
        detail: {
          tags: ["HTMX"],
        },
      })
  )
);

export const websocketRoutes = new Elysia().ws("/ws", {
  open(ws) {
    ws.subscribe("broadcast");
    console.log("🟢 Websocket connection opened!");
  },
  message(ws, message) {
    console.log("🔵 Websocket message received!");
    ws.send(`<p hx-id="countfromserver" id="countfromserver">${message}</p>`);
    ws.publish(
      "broadcast",
      `<p hx-id="countfromserver" id="countfromserver">${message}</p>`
    );
  },
  close(ws) {
    ws.unsubscribe("broadcast");
    console.log("🔴 Websocket connection closed!");
  },
});
