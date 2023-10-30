module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    },
    imgurl: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }, price: {
      type: Sequelize.STRING
    }
  });

  return Event;
};
