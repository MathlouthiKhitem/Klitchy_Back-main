module.exports = app => {
  const foods = require("../controllers/food.controller.js");

  var router = require("express").Router();
  const upload = require("../middleware/upload");

  // Create a new Food
  router.post("/", upload.single("file"), foods.create);

  // Retrieve all Foods
  router.get("/resto/:categoryId", foods.findAll);

  // Retrieve a single Food with id
  router.get("/:id", foods.findOne);

  // Update a Food with id
  router.post("/update/:id", upload.single("file"), foods.update);

  // Delete a Food with id
  router.delete("/:id", foods.delete);


  app.use('/api/foods', router);
};
