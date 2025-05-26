const router = require("express").Router();

router.get("/", () => console.log("GET returns all clothing items"));
router.post("/", (req) => console.log("POST creates a new item"));
router.delete("/:itemId", () => console.log("DELETE an item by _id"));

module.exports = router;
