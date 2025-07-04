const router = require("express").Router();
const { validateCardBody, validateId } = require("../middlewares/validation");


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
router.delete("/:itemId", validateId, deleteItem); // DELETE specific item - PROTECTED
router.put("/:itemId/likes", validateId, likeClothingItem); // PROTECTED
router.delete("/:itemId/likes", validateId, dislikeClothingItem); // PROTECTED

module.exports = router;
