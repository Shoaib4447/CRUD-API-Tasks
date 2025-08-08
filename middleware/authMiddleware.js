import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No token
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(403)
      .json({ message: "Authentication token is required" });

  try {
    const token = authHeader.split(" ")[1];
    // not tempered token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("req.user authMiddleware=>", req.user);
    return next();
  } catch (error) {
    console.log("auth error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
