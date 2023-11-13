export const sendToWs = async (message: string) => {
  const socket = new WebSocket("ws://localhost:3000/ws");
  await new Promise<void>((resolve) => {
    socket.onopen = () => {
      socket.send(message);
      resolve();
    };
  });
  socket.close();
};
