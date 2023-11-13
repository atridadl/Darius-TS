import { expect, mock, test } from "bun:test";
import { sendToWs } from "@/lib/ws";
import { sayHello } from "@/api/hello";

// Tests
test("correct text is returned", async () => {
  const hello = await sayHello();
  expect(hello).toBe(
    `<p id="hello">Hi! This HTML was sent from the server!</p>`
  );
});
