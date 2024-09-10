const roleMiddleware = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        return res.status(403).json({ message: `Access denied: ${role} only` });
      }
    };
  };
  
  module.exports = roleMiddleware;
  