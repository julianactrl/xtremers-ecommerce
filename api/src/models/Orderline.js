const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orderline', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
