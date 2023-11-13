import { expect, mock, test } from "bun:test";
import { decrementCount, getCount, incrementCount } from "@/api/count";
import { sendToWs } from "@/lib/ws";

// Mocks
mock(sendToWs).mockImplementation(async (message: string) => {
  console.log(message);
});

// Tests
test("get initial count of 0", async () => {
  const count = await getCount();
  expect(count).toBe(`<p hx-id="countfromserver" id="countfromserver">0</p>`);
});

test("increment count to 1", async () => {
  await incrementCount();
  const count = await getCount();
  expect(count).toBe(`<p hx-id="countfromserver" id="countfromserver">1</p>`);
});

test("decrement count to 0", async () => {
  await decrementCount();
  const count = await getCount();
  expect(count).toBe(`<p hx-id="countfromserver" id="countfromserver">0</p>`);
});
