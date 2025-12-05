export const authMiddleware = async (req, reply) => {
  try {
    // 1. Extract token
    console.log('req.headers:', req.headers)
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    console.log('token:', token)

    // 2. Verify token
    const decoded = await req.jwtVerify(token);
    console.log('decoded:', decoded)

    // 3. Attach user info to request
    req.user = decoded;

  } catch (err) {
    return reply.code(401).send({
      message: "Invalid or Expired Token",
    });
  }
};
