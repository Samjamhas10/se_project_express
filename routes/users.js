const router = require("express").Router(); // import router functionality from Express
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

// all endpoints here start with /users

// authorization
router.use(auth);

router.get("/me", getCurrentUser); // PROTECTED
router.patch("/me", updateProfile); // PROTECTED

// export router
module.exports = router;
