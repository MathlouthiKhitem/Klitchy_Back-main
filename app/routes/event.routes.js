module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();
  const upload = require("../middleware/upload");

  // Create a new Event
  router.post("/", upload.single("file"), events.create);

  // Retrieve all Events
  router.get("/resto/:restoId", events.findAll);

  // Retrieve a single Event with id
  router.get("/:id", events.findOne);

  // Update a Event with id
  router.post("/update/:id", upload.single("file"), events.update);

  // Delete a Event with id
  router.delete("/:id", events.delete);


  app.use('/api/events', router);
};
