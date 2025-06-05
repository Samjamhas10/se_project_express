const router = require("express").Router(); // import router functionality from Express
const {
  getUsers,
  getCurrentUser,
  createUser,
  updateProfile,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.post("/", createUser);
router.patch("/me", updateProfile);

// export router
module.exports = router;
