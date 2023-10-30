const db = require("../models");
const TableResto = db.tableRestos;



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
  const tableResto = {
    name: req.body.name,
    // listclients: "",
    // owner: "",
    qrcode: req.body.qrcode,
    // statuts: "free",
    // total: 0,
    // isSplit: false,
    restoId: req.body.restoId
  };

  // Save Tutorial in the database
  TableResto.create(tableResto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tableRetso."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const restoId = req.params.restoId;
  TableResto.findAll({ where: { restoId: restoId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tableRestos."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TableResto.findByPk(id)
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

// Update a tableResto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  TableResto.update(req.body, {
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

  TableResto.destroy({
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


// Find a single Tutorial with an id
exports.getTableByQrCode = (req, res) => {
  const qrcode = req.body.qrcode;

console.log("qrcode "+req.body.qrcode);
  TableResto.findOne({
    where: { qrcode: qrcode }
  })
    .then(data => {
      if (data) {
        res.send({ "tableResto": data });
      } else {
        res.status(404).send({
          "tableResto": null
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TableResto with qrcode=" + qrcode
      });
    });
};


// Update a tableResto owner
// exports.updateOwner = (req, res) => {
//   const id = req.body.id;

//   TableResto.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "tableResto owner was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };
exports.updateOwner = (req, res) => {
  const tableId = req.body.tableId; // Assuming "tableId" is the field containing the table's ID
  const newOwnerId = req.body.newOwnerId; // Assuming "newOwnerId" is the field containing the new owner's ID

  TableResto.update({ owner: newOwnerId }, {
    where: { id: tableId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `TableResto with id=${tableId} owner was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update TableResto with id=${tableId}. Maybe TableResto was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating TableResto with id=" + tableId
      });
    });
};
