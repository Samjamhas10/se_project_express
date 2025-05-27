const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItems,
} = require("../controllers/clothingItems"); // import

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItems);

module.exports = router;
