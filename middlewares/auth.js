const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors"); // import http 401 status code

// exporting the middleware function
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // check if authorization header exists and starts with 'Bearer'
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // verify the token using some secret key
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // if verification fails, respond with 401
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }

  req.user = payload; // assigning the payload to the request object
  return next(); // sending the request to the next middleware
};

module.exports = auth;
