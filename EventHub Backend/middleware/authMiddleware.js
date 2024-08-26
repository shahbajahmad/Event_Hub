const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ error: "Token not found" }).status(404);
 try {
    if (authHeader.startsWith("Bearer ")) {
        authToken = authHeader.split(" ")[1];
        jwt.verify(authToken, process.env.SECRET_KEY);
        next();
      }
 } catch (error) {
    return res.status(401).json({error });
 }
  
};

module.exports = { authMiddleware };
