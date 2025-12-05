import fp from "fastify-plugin";
import fastifyIO from "fastify-socket.io";

export const EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "join_room",
  LEFT_ROOM: "left_room",
  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",
};

export const onlineUsersMap = new Map();

export default fp(async (fastify) => {
  await fastify.register(fastifyIO, {
    cors: { origin: "*", methods: ["GET", "POST"], credentials: false },
    path: "/socket.io/",
    serveClient: false,
    transports: ["websocket", "polling"],
  });

  // JWT Authentication
  fastify.io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No token"));

      const decoded = await fastify.jwt.verify(token);
      socket.data.user = decoded;

      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  fastify.io.on(EVENTS.CONNECT, (socket) => {
    const userId = socket.data.user.user_profile_id;

    // Track online
    onlineUsersMap.set(userId, { socketId: socket.id, lastSeen: new Date() });
    socket.broadcast.emit(EVENTS.USER_ONLINE, { userId });

    // Join Room
    socket.on(EVENTS.JOIN_ROOM, ({ room_id }) => {
      socket.join(room_id);
      socket.emit("success", { message: "Joined room" });
    });

    // Leave Room
    socket.on(EVENTS.LEFT_ROOM, ({ room_id }) => {
      socket.leave(room_id);
      socket.emit("success", { message: "Left room" });
    });

    socket.on(EVENTS.DISCONNECT, () => {
      onlineUsersMap.delete(userId);
      socket.broadcast.emit(EVENTS.USER_OFFLINE, { userId });
    });
  });
}, {
  name: "websocket-plugin",
  dependencies: ["@fastify/jwt"],
});
