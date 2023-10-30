const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
   dbConfig.PASSWORD, 
   {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.port,
  pool: {
    // max: dbConfig.pool.max,
    // min: dbConfig.pool.min,
    // acquire: dbConfig.pool.acquire,
    // idle: dbConfig.pool.idle
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.categories = require("./category.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.events = require("./event.model.js")(sequelize, Sequelize);
db.foods = require("./food.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.restos = require("./resto.model.js")(sequelize, Sequelize);
db.tableRestos = require("./tableResto.model.js")(sequelize, Sequelize);








//db.events.belongsTo(db.restos, { through: db.events, foreignKey: "RestoID", });
db.restos.hasMany(db.events, { as: "events" });
db.events.belongsTo(db.restos, {
  foreignKey: "restoId",
  as: "resto",
});



//db.foods.belongsTo(db.restos, { through: db.foods, foreignKey: "RestoID", });
db.restos.hasMany(db.foods, { as: "foods" });
db.foods.belongsTo(db.restos, {
  foreignKey: "restoId",
  as: "resto",
});


//db.foods.belongsTo(db.categories, { through: db.foods, foreignKey: "CategoryID", });
db.categories.hasMany(db.foods, { as: "foods" });
db.foods.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});


//db.categories.belongsTo(db.restos, { through: db.categories, foreignKey: "RestoID", });

db.restos.hasMany(db.categories, { as: "categories" });
db.categories.belongsTo(db.restos, {
  foreignKey: "restoId",
  as: "resto",
});

//db.orders.belongsTo(db.foods, { through: db.orders, foreignKey: "FoodID", });
db.foods.hasMany(db.orders, { as: "foods" });
db.orders.belongsTo(db.foods, {
  foreignKey: "foodId",
  as: "food",
});

//db.orders.belongsTo(db.clients, { through: db.orders, foreignKey: "ClientID", });
db.clients.hasMany(db.orders, { as: "clients" });
db.orders.belongsTo(db.clients, {
  foreignKey: "clientId",
  as: "client",
});

//db.orders.belongsTo(db.restos, { through: db.orders, foreignKey: "RestoID", });
db.restos.hasMany(db.orders, { as: "restos" });
db.orders.belongsTo(db.restos, {
  foreignKey: "restoId",
  as: "resto",
});


//db.orders.belongsTo(db.tableRestos, { through: db.orders, foreignKey: "TableRestoID", });
db.tableRestos.hasMany(db.orders, { as: "tableRestos" });
db.orders.belongsTo(db.tableRestos, {
  foreignKey: "tableRestoId",
  as: "tableResto",
});


//db.tableRestos.belongsTo(db.restos, { through: db.tableRestos, foreignKey: "RestoID", });
db.restos.hasMany(db.tableRestos, { as: "restoss" });
db.tableRestos.belongsTo(db.restos, {
  foreignKey: "restoId",
  as: "resto",
});



module.exports = db;