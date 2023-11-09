let count = 0; // in-memory count

export const incrementCount = async () => {
  count++;

  const socket = new WebSocket("ws://localhost:3000/ws");
  await new Promise<void>((resolve) => {
    socket.onopen = () => {
      socket.send(count.toString());
      resolve();
    };
  });
  socket.close();
};

export const decrementCount = async () => {
  count--;

  const socket = new WebSocket("ws://localhost:3000/ws");
  await new Promise<void>((resolve) => {
    socket.onopen = () => {
      socket.send(count.toString());
      resolve();
    };
  });
  socket.close();
};

export const getCount = async () => {
  return `<p hx-id="countfromserver" id="countfromserver">${count}</p>`;
};
