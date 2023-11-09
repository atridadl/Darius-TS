import { BaseBody } from "@/components/layouts/BaseBody";
import { BaseHead } from "@/components/layouts/BaseHead";

export const homePage = () => (
  <html lang="en" class="h-[100%] w-[100%] fixed overflow-y-auto">
    <BaseHead>
      <>
        <title>Darius | Home</title>
        <script src="public/js/ws.js" />
      </>
    </BaseHead>

    <BaseBody>
      <>
        {/* Add body content here */}
        <h1 class="text-2xl sm:text-4xl">
          <span class="bg-gradient-to-br from-cyan-300 to-purple-300 bg-clip-text text-transparent box-decoration-clone">
            ✨ Darius ✨
          </span>
        </h1>

        <h2 class="text-xl sm:text-2xl">
          <span class="bg-gradient-to-br from-cyan-300 to-purple-300 bg-clip-text text-transparent box-decoration-clone">
            🚀 A Web Application Template Powered by HTMX + Elysia + Tailwind 🚀
          </span>
        </h2>

        <br />

        <h2 class="text-xl sm:text-2xl">Fetch and Swap Demo:</h2>

        <button
          class="btn btn-secondary"
          hx-get="/api/htmx/hello"
          hx-trigger="click"
          hx-target="#hello"
          hx-swap="outerHTML"
        >
          Click Me!
        </button>

        <p id="hello"></p>

        <br />

        <h2 class="text-xl sm:text-2xl">Websocket Counter Demo:</h2>

        <div class="flex-row flex gap-2 justify-center items-center text-center">
          <button
            class="btn btn-secondary"
            hx-post="/api/htmx/count/decrementCount"
            hx-trigger="click"
            hx-swap="none"
          >
            -
          </button>

          <button
            class="btn btn-secondary"
            hx-post="/api/htmx/count/incrementCount"
            hx-trigger="click"
            hx-swap="none"
          >
            +
          </button>
        </div>

        <div hx-ext="ws" ws-connect="/ws">
          <p
            hx-get="/api/htmx/count/getCount"
            hx-trigger="load"
            hx-target="this"
            hx-swap="outerHTML"
            id="countfromserver"
          >
            0
          </p>
        </div>
      </>
    </BaseBody>
  </html>
);
