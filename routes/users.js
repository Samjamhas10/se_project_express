const router = require("express").Router(); // import router functionality from Express
const { getUsers, getCurrentUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.post("/", createUser);


// export router
module.exports = router;
