const jwt = require("jsonwebtoken");
const config = require("config");

// middleware for token check
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.family = decoded.family;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
