module.exports = (sequelize, Sequelize) => {
  const Resto = sequelize.define("resto", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    imgurl: {
      type: Sequelize.STRING
    },
    coverimgurl: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    canOrder: {
      type: Sequelize.BOOLEAN
    },
    isActive: {
      type: Sequelize.BOOLEAN
    },
    haveEvent: {
      type: Sequelize.BOOLEAN
    },
    password: {
      type: Sequelize.STRING
    },
    typeResto: {
      type: Sequelize.STRING
    },

  });


  return Resto;
};
