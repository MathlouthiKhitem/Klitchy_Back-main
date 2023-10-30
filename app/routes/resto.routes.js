module.exports = app => {
  const restos = require("../controllers/resto.controller.js");

  var router = require("express").Router();

  // Create a new Resto
  router.post("/", restos.create);

  // Retrieve all Restos
  router.get("/", restos.findAll);

  // Retrieve a single Resto with id
  router.get("/:id", restos.findOne);

  // Update a Resto with id
  router.put("/:id", restos.update);

  // Delete a Resto with id
  router.delete("/:id", restos.delete);

  // Retrieve a single Resto with id
  router.post("/login", restos.loginResto);


  app.use('/api/restos', router);
};
