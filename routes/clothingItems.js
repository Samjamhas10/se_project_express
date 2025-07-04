const router = require("express").Router();
const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

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
router.post("/", validateCardBody, createItem); // POST new item - PROTECTED
router.delete("/:itemId", validateItemId, deleteItem); // DELETE specific item - PROTECTED
router.put("/:itemId/likes", validateItemId, likeClothingItem); // PROTECTED
router.delete("/:itemId/likes", validateItemId, dislikeClothingItem); // PROTECTED

module.exports = router;
