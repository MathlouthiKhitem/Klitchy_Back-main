const db = require("../models");
const Category = db.categories;
const fs = require("fs");
const uploadFile = require("../middleware/upload");

// Create and Save a new category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!" + req.body.name
    });
    return;
  }



  // Create a Tutorial
  const category = {
    name: req.body.name,
        imgurl: "/category/" + req.file.filename,
 
    restoId: req.body.restoId,
  };

  // Save Tutorial in the database
  Category.create(category)
    .then(data => {
      fs.rename(
        __basedir + "/resources/uploads/" + req.file.filename,
        __basedir + "/resources/uploads/category/" + req.file.filename, function (err) {
          if (err) throw err

        }
      );
      res.send({ "category": data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }
  
//   // Create a Tutorial
//   const categories = {
//     name: req.body.name,
//     restoId: req.body.restoId,
//     // imgurl: req.body.imgurl,
//     imgurl:`${req.protocol}://${req.get("host")}/img/${req.file.filename}`,



//   };

//   // Save Tutorial in the database
//   Category.create(categories)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the category."
//       });
//     });
// };


// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const restoId = req.params.restoId;

//   // Retrieve categories that match the specified restoId
//   Category.findAll({ where: { restoId: restoId } })
//     .then(data => {
//       // Send the retrieved data as the response
//       res.send(data);
//     })
//     .catch(err => {
//       // Handle errors and send an error response if needed
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving categories."
//       });
//     });
// };
exports.findAll = async (req, res) => {
  const restoId = req.params.restoId;

  try {
    const categories = await Category.findAll({
      where: { restoId: restoId },
    });

    // Return the list of categories in JSON format
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: `Error while retrieving categories: ${error.message}`,
    });
  }
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
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

  Category.update(req.body, {
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

  Category.destroy({
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
