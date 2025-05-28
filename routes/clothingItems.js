const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/clothingItems"); // import

router.get("/", getItems); // GET all items
router.post("/", createItem); // POST new item
router.delete("/:itemId", deleteItem); // DELETE specific item
router.put("/:itemId", updateItem); // PUT

module.exports = router;
