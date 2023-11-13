import { sendToWs } from "@/lib/ws";

let count = 0; // in-memory count

export const incrementCount = async () => {
  count++;

  sendToWs(count.toString());
};

export const decrementCount = async () => {
  count--;

  sendToWs(count.toString());
};

export const getCount = async () => {
  return `<p hx-id="countfromserver" id="countfromserver">${count}</p>`;
};
