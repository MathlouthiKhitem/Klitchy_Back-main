const db = require("../models");
const Event = db.events;
const fs = require("fs");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const event = {
    name: req.body.name,
    date: req.body.date,
    imgurl: "/event/" + req.file.filename,
    description: req.body.description,
    price: req.body.price,
    restoId: req.body.restoId


  };

  // Save Event in the database
  Event.create(event)
    .then(data => {
      fs.rename(
        __basedir + "/resources/uploads/" + req.file.filename,
        __basedir + "/resources/uploads/event/" + req.file.filename, function (err) {
          if (err) throw err

        }
      );
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });
};

// Retrieve all   Events from the database.
exports.findAll = (req, res) => {
  const restoId = req.params.restoId;
  Event.findAll({ where: { restoId: restoId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
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

  Event.update(req.body, {
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
  const id = req.params.id;

  Event.findByPk(id)
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
          message: `Cannot find Event with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id
      });
    });

  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};
