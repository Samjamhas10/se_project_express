const Item = require("../models/clothingItem");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
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
    createdAt: new Date(),
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const itemId = req.params.itemId; // identifying which item to delete
  Item.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      // if an error occurs
      console.error(err);
      return res.status(400).send({ message: err.message });
    });
};

const updateItem = (req, res, method) => {
  const { itemId } = req.params;

  console.log(itemId);
  Item.findByIdAndUpdate(
    itemId,

    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(500).send({ message: err.message });
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
  updateItem,
  likeClothingItem,
  dislikeClothingItem,
};
