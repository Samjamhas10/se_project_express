const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems"); // import
const auth = require("../middlewares/auth"); 

router.get("/", getItems); // GET all items // NOT protected

// authorization
router.use(auth);
router.post("/", createItem); // POST new item - PROTECTED
router.delete("/:itemId", deleteItem); // DELETE specific item - PROTECTED
router.put("/:itemId/likes", likeClothingItem); // PROTECTED
router.delete("/:itemId/likes", dislikeClothingItem); // PROTECTED

module.exports = router;
