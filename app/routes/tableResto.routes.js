module.exports = app => {
  const tableRestos = require("../controllers/tableResto.controller.js");

  var router = require("express").Router();

  // Create a new TableResto
  router.post("/", tableRestos.create);

  // Retrieve all TableRestos
  router.get("/resto/:restoId", tableRestos.findAll);

  // Retrieve a single TableResto with id
  router.get("/:id", tableRestos.findOne);

  // Update a TableResto with id
  router.put("/:id", tableRestos.update);

  // Delete a TableResto with id
  router.delete("/:id", tableRestos.delete);
  // Retrieve a single TableResto with id
  router.post("/getTable", tableRestos.getTableByQrCode);
  // Update owner TableResto with id
  router.post("/setOwner", tableRestos.updateOwner);

  app.use('/api/tableRestos', router);
};
