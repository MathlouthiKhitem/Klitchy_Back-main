const db = require("../models");
const Food = db.foods;
const fs = require("fs");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const food = {
    name: req.body.name,
    imgurl: "/food/" + req.file.filename,
    price: req.body.price,
    description: "description",
    totalRating: 0,
    avgRating: 0,
    description: "description",
    restoId: req.body.restoId,
    categoryId: req.body.categoryId
  };

  try {

  } catch (error) {

  }

  // Save Tutorial in the database
  await Food.create(food)
    .then(data => {
      fs.rename(
        __basedir + "/resources/uploads/" + req.file.filename,
        __basedir + "/resources/uploads/food/" + req.file.filename, function (err) {
          if (err) throw err

        }
      );
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the food."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const categoryId = req.params.categoryId;
  Food.findAll({ where: { categoryId: categoryId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving foods."
      });
    });
};

// Find a single Food with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Food.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Food with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food with id=" + id
      });
    });
};

// Update a Food by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Food.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Food with id=${id}. Maybe Food was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Food with id=" + id
      });
    });
};

// Delete a Food with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Food.findByPk(id)
    .then(data => {
      if (data) {
        const imgurl = data["imgurl"];
        fs.unlink(

          __basedir + "/resources/uploads/" + imgurl, function (err) {
            if (err) throw err

          }
        );
      } else {
        res.status(404).send({
          message: `Cannot find Food with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Food with id=" + id
      });
    });

  Food.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Food was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Food with id=${id}. Maybe Food was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Food with id=" + id
      });
    });
};
