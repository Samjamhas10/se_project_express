const router = require("express").Router(); // import router functionality from Express
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserBody } = require("./middlewares/validation");

// all endpoints here start with /users

// authorization
router.use(auth);

router.get("/me", getCurrentUser); // PROTECTED
router.patch("/me", validateUserBody, updateProfile); // PROTECTED

// export router
module.exports = router;
