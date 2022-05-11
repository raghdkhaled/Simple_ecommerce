const jwt = require("jsonwebtoken");
const jwtKey = "prodjectkeygamd";
const config = require("config");

const verifyToken = (req, res, next) => {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

const createToken = (id, email, password) => {
  return jwt.sign({ id, email, password }, jwtKey, {
    expiresIn: "1200s", //20 mins
  });
};

module.exports.verifyToken = verifyToken;
module.exports.createToken = createToken;
