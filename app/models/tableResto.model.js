module.exports = (sequelize, Sequelize) => {
    const TableResto = sequelize.define("tableResto", {
      name: {
        type: Sequelize.STRING
      },
      listclients: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      qrcode: {
        type: Sequelize.STRING
      },
      statuts: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DOUBLE
      },
      isSplit: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return TableResto;
  };
  