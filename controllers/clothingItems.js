const Item = require("../models/clothingItem");
const { NotFoundError, ForbiddenError } = require("../utils/errors");
const { okStatusCode, createdStatusCode } = require("../utils/statusCodes");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => {
      res.status(okStatusCode).send(items);
    })
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({
    name,
    weather,
    imageUrl,
    likes: [],
    owner: req.user._id,
  })
    .then((item) => res.status(createdStatusCode).send(item))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params; // identifying which item to delete
  const userId = req.user._id;
  // find item by id
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Requested resource not found"));
      }
      // check if current user is the owner
      if (item.owner.toString() !== userId.toString()) {
        return next(new ForbiddenError("Access denied"));
      }
      return Item.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(okStatusCode).send(deletedItem)
      );
    })
    .catch(next);
};

const updateItem = (req, res, method, next) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(
    itemId,

    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Requested resource not found"))
    .then((item) => res.status(okStatusCode).send(item))
    .catch(next);
};

// PUT /items/:id/likes
const likeClothingItem = (req, res, next) =>
  updateItem(req, res, "$addToSet", next);

// DELETE /items/:id/likes
const dislikeClothingItem = (req, res, next) =>
  updateItem(req, res, "$pull", next);

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
};
