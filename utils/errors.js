const NotFoundError = require("./not-found-err");
const BadRequestError = require("./bad-request-err");
const ForbiddenError = require("./forbidden-err");
const UnauthorizedError = require("./unauthorized-err");
const ConflictError = require("./conflict-err");

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
};
