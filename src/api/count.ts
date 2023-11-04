export const incrementCount = async (redis: any) => {
  const newCount = await redis.incr("count");

  const socket = new WebSocket("ws://localhost:3000/ws");
  await new Promise<void>((resolve) => {
    socket.onopen = () => {
      socket.send(newCount);
      resolve();
    };
  });
  socket.close();
};

export const decrementCount = async (redis: any) => {
  const newCount = await redis.decr("count");

  const socket = new WebSocket("ws://localhost:3000/ws");
  await new Promise<void>((resolve) => {
    socket.onopen = () => {
      socket.send(newCount);
      resolve();
    };
  });
  socket.close();
};

export const getCount = async (redis: any) => {
  const count = await redis.get("count");

  return `<p hx-id="countfromserver" id="countfromserver">${count}</p>`;
};
