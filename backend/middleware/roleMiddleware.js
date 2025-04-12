// middleware/roleMiddleware.js

const checkRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: Unauthorized role" });
      }
      next();
    };
  };
  
  export { checkRole };
  