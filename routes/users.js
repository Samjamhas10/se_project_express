const router = require("express").Router(); // import router functionality from Express

router.get("/", () => console.log("GET users"));
router.get("/:userId", (req) => console.log("GET users by Id"));
router.post("/", () => console.log("POST users"));

// export router
module.exports = router;
