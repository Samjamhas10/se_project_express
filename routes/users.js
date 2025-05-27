const router = require("express").Router(); // import router functionality from Express
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

// export router
module.exports = router;
