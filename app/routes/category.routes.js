

// module.exports = app => {
//   const categories = require("../controllers/category.controller.js");

//   var router = require("express").Router();
//   const upload = require("../middleware/upload");

//   // Create a new Category
//   app.post("/createcategories", categories.create);

//   // Retrieve all categories
//   router.get("/resto/:restoId", categories.findAll);

//   // Retrieve a single Category with id
//   router.get("/:id", categories.findOne);

//   // Update a Category with id
//   router.put("/:id", categories.update);

//   // Delete a Category with id
//   router.delete("/:id", categories.delete);


//   app.use('/api/categories', router);
// };
const multer= require("../middlewares/multer-config.js")
const upload = require("../middleware/upload");
module.exports = app => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Create a new Resto
  // router.post("/",multer("imgurl") , categories.create);


  // Create a new Food
  router.post("/", upload.single("file"), categories.create);
  router.get("/:restoId", categories.findAll);

  app.use('/api/categories', router);
};
