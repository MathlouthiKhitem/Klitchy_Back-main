module.exports = (sequelize, Sequelize) => {
  const Food = sequelize.define("food", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    imgurl: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    totalRating: {
      type: Sequelize.INTEGER
    },
    avgRating: {
      type: Sequelize.DOUBLE
    }
  });

  return Food;
};
