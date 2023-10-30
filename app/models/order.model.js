module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    orderNum: {
      type: Sequelize.STRING
    },
    total: {
      type: Sequelize.DOUBLE
    },
    qty: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
    paymentMethod: {
      type: Sequelize.STRING
    }
  });

  return Order;
};
