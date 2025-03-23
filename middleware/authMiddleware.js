const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secretKey);
    console.log("🔑 Decoded Token:", decoded);

    if (!decoded._id) {
      return res
        .status(400)
        .json({ message: "Token does not contain user ID" });
    }

    req.user = { _id: decoded._id, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
