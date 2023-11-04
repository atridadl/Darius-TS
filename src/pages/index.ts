import { html } from "@elysiajs/html";
import Elysia from "elysia";

import { homePage } from "./home";

export const pageRoutes = new Elysia().use(html()).get("/", homePage);
