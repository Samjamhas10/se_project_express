const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems"); // import

router.get("/", getItems); // GET all items
router.post("/", createItem); // POST new item
router.delete("/:itemId", deleteItem); // DELETE specific item
router.put("/:itemId", updateItem); // PUT
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
