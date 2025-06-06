const router = require("express").Router(); // import router functionality from Express
const { getCurrentUser, updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

// export router
module.exports = router;
