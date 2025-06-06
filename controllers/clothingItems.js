const Item = require("../models/clothingItem");
const user = require("../models/user");
const {
  badRequestStatusCode,
  internalServerStatusCode,
  okStatusCode,
  createdStatusCode,
  notFoundStatusCode,
  forbiddenStatusCode,
} = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => {
      res.status(okStatusCode).send(items);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  Item.create({
    name,
    weather,
    imageUrl,
    likes: [],
    owner: req.user._id,
  })
    .then((item) => res.status(createdStatusCode).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params; // identifying which item to delete
  const userId = req.user._id;
  // find item by id
  Item.findById(itemId).then((item) => {
    if (!item) {
      return res.status(forbiddenStatusCode).send({ message: "Forbidden" });
    }
    // check if current user is the owner
    if (item.owner.toString() !== userId.toString()) {
      return res.status(forbiddenStatusCode).send({ message: "Access denied" });
    }
    
  });
  return Item.findByIdAndDelete(itemId)
    .then((deletedItem) => {
      if (!deletedItem) {
        return res
          .status(notFoundStatusCode)
          .send({ message: "Requested resource not found" });
      }
      return res.status(okStatusCode).send(deletedItem);
    })
    .catch((err) => {
      // if an error occurs
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateItem = (req, res, method) => {
  const { itemId } = req.params;

  Item.findByIdAndUpdate(
    itemId,

    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(okStatusCode).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(notFoundStatusCode)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(badRequestStatusCode)
          .send({ message: "Invalid data" });
      }
      return res
        .status(internalServerStatusCode)
        .send({ message: "An error has occurred on the server" });
    });
};

// PUT /items/:id/likes
const likeClothingItem = (req, res) => updateItem(req, res, "$addToSet");

// DELETE /items/:id/likes
const dislikeClothingItem = (req, res) => updateItem(req, res, "$pull");

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
};
