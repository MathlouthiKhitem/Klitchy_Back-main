const db = require("../models");
const Resto = db.restos;
const bcrypt = require('bcrypt');

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  // Create a Tutorial
  const resto = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    imgurl: req.body.imgurl,
    coverimgurl: req.body.imgurl,
    address: req.body.address,
    canOrder: req.body.canOrder,
    isActive: req.body.isActive,
    haveEvent: req.body.haveEvent,
    password: hash,
    typeResto:req.body.typeResto

  };

  // Save Tutorial in the database
  Resto.create(resto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log("test");
  Resto.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resto.findByPk(id)
    .then(data => {
      if (data) {
        data.password = "";
        res.send({ "resto": data });
      } else {
        res.status(404).send({ "resto": null });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Resto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

  Resto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


//get client by phone
exports.loginResto = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Resto.findOne({
    where: { username: username }
  })
    .then(data => {
      bcrypt.compare(password, data['password'], function (err, result) {
        if (data && result) {
          res.send({ "resto": data });
        } else {
          res.status(404).send({
            "resto": null
          });
        }
      });

    })
    .catch(err => {

      res.status(500).send({
        message: "Error retrieving Resto with username=" + username
      });
    });
};