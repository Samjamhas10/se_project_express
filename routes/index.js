const router = require("express").Router();

const userRouter = require("./users"); // import user routes
const itemsRouter = require("./clothingItems");


router.use("/users", userRouter);
router.use("/items", itemsRouter);

module.exports = router;

