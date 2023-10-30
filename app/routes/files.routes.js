module.exports = app => {
    const controller = require("../controllers/file.controller.js");

    var router = require("express").Router();

    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.download);
    router.delete("/files/:name", controller.remove);




    app.use('/api/uploadFile', router);
};
